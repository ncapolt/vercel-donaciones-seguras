import pool from "../db.js";

// Generar código de reserva único de 6 dígitos
export const generarCodigoReserva = async () => {
    try {
        const result = await pool.query('SELECT generar_codigo_reserva() as codigo');
        return result.rows[0].codigo;
    } catch (error) {
        // Si la función no existe, generar código manualmente
        let codigo;
        let existe = true;
        let intentos = 0;
        const maxIntentos = 100;
        
        while (existe && intentos < maxIntentos) {
            codigo = Math.floor(100000 + Math.random() * 900000).toString();
            const check = await pool.query(
                'SELECT id FROM pedido WHERE codigo_reserva = $1',
                [codigo]
            );
            existe = check.rows.length > 0;
            intentos++;
        }
        
        if (intentos >= maxIntentos) {
            throw new Error('No se pudo generar un código único después de múltiples intentos');
        }
        
        return codigo;
    }
};

// Crear un nuevo pedido
export const createPedido = async (usuarioId, campaignId, productoIds) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        
        // Generar código de reserva
        const codigoReserva = await generarCodigoReserva();
        
        // Crear el pedido
        const pedidoResult = await client.query(
            `INSERT INTO pedido (codigo_reserva, usuario_id, campaign_id, estado)
             VALUES ($1, $2, $3, 'pendiente')
             RETURNING id, codigo_reserva, usuario_id, campaign_id, estado, fecha_creacion`,
            [codigoReserva, usuarioId, campaignId]
        );
        
        const pedido = pedidoResult.rows[0];
        
        // Agregar productos al pedido y reservarlos
        if (productoIds && productoIds.length > 0) {
            for (const productoId of productoIds) {
                // Insertar en pedido_producto
                await client.query(
                    `INSERT INTO pedido_producto (pedido_id, producto_id)
                     VALUES ($1, $2)
                     ON CONFLICT (pedido_id, producto_id) DO NOTHING`,
                    [pedido.id, productoId]
                );
                
                // Cambiar estado del producto a 'reservado'
                await client.query(
                    `UPDATE producto 
                     SET estado_producto = 'reservado'
                     WHERE id = $1 AND estado_producto = 'libre'`,
                    [productoId]
                );
            }
        }
        
        await client.query('COMMIT');
        return pedido;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

// Buscar pedido por código de reserva
export const getPedidoByCodigo = async (codigoReserva) => {
    try {
        const result = await pool.query(
            `SELECT p.id, p.codigo_reserva, p.usuario_id, p.campaign_id, p.estado, 
                    p.fecha_creacion, p.fecha_entrega,
                    u.nombre as usuario_nombre, u.apellido as usuario_apellido,
                    c.nombre as campaign_nombre
             FROM pedido p
             LEFT JOIN usuarios u ON p.usuario_id = u.id
             LEFT JOIN campaign c ON p.campaign_id = c.id
             WHERE p.codigo_reserva = $1`,
            [codigoReserva]
        );
        return result.rows[0] || null;
    } catch (error) {
        throw error;
    }
};

// Obtener pedido por ID
export const getPedidoById = async (pedidoId) => {
    try {
        const result = await pool.query(
            `SELECT p.id, p.codigo_reserva, p.usuario_id, p.campaign_id, p.estado, 
                    p.fecha_creacion, p.fecha_entrega,
                    u.nombre as usuario_nombre, u.apellido as usuario_apellido,
                    c.nombre as campaign_nombre
             FROM pedido p
             LEFT JOIN usuarios u ON p.usuario_id = u.id
             LEFT JOIN campaign c ON p.campaign_id = c.id
             WHERE p.id = $1`,
            [pedidoId]
        );
        return result.rows[0] || null;
    } catch (error) {
        throw error;
    }
};

// Obtener productos de un pedido
export const getProductosByPedido = async (pedidoId) => {
    try {
        const result = await pool.query(
            `SELECT pr.id, pr.producto_id, pr.pedido_id,
                    p.nombre, p.estado, p.estado_producto, p.destino, p.nota,
                    tp.nombre as tipo_nombre, tp.id as tipo_producto_id
             FROM pedido_producto pr
             LEFT JOIN producto p ON pr.producto_id = p.id
             LEFT JOIN tipo_producto tp ON p.tipo_producto_id = tp.id
             WHERE pr.pedido_id = $1
             ORDER BY p.nombre`,
            [pedidoId]
        );
        return result.rows;
    } catch (error) {
        throw error;
    }
};

// Marcar pedido como entregado
export const entregarPedido = async (pedidoId, productoIds) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        
        // Actualizar estado del pedido
        await client.query(
            `UPDATE pedido 
             SET estado = 'entregado', fecha_entrega = NOW()
             WHERE id = $1`,
            [pedidoId]
        );
        
        // Marcar productos como entregados
        if (productoIds && productoIds.length > 0) {
            const placeholders = productoIds.map((_, index) => `$${index + 1}`).join(', ');
            await client.query(
                `UPDATE producto 
                 SET estado_producto = 'entregado'
                 WHERE id IN (${placeholders})`,
                productoIds
            );
        }
        
        await client.query('COMMIT');
        
        // Obtener el pedido actualizado
        const pedidoResult = await client.query(
            'SELECT * FROM pedido WHERE id = $1',
            [pedidoId]
        );
        
        return pedidoResult.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

// Obtener productos disponibles para pedidos (libres)
export const getProductosDisponibles = async (campaignId) => {
    try {
        const result = await pool.query(
            `SELECT p.id, p.campaign_id, p.nombre, p.estado, p.estado_producto, p.destino, p.nota,
                    tp.nombre as tipo_nombre, tp.id as tipo_producto_id
             FROM producto p
             LEFT JOIN tipo_producto tp ON p.tipo_producto_id = tp.id
             WHERE p.campaign_id = $1 
             AND p.estado_producto = 'libre'
             ORDER BY p.nombre`,
            [campaignId]
        );
        return result.rows;
    } catch (error) {
        throw error;
    }
};

// Obtener pedidos de un usuario
export const getPedidosByUsuario = async (usuarioId) => {
    try {
        const result = await pool.query(
            `SELECT p.id, p.codigo_reserva, p.campaign_id, p.estado, 
                    p.fecha_creacion, p.fecha_entrega,
                    c.nombre as campaign_nombre
             FROM pedido p
             LEFT JOIN campaign c ON p.campaign_id = c.id
             WHERE p.usuario_id = $1
             ORDER BY p.fecha_creacion DESC`,
            [usuarioId]
        );
        return result.rows;
    } catch (error) {
        throw error;
    }
};

