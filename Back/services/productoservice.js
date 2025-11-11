import pool from "../db.js";

export const getProductsByCampaign = async (campaignId) => {
    try {
        const result = await pool.query(
            `SELECT p.id, p.campaign_id, p.nombre, p.estado, p.estado_producto, p.destino, p.nota,
                    tp.nombre as tipo_nombre, tp.id as tipo_producto_id
             FROM producto p
             LEFT JOIN tipo_producto tp ON p.tipo_producto_id = tp.id
             WHERE p.campaign_id = $1
             ORDER BY p.id DESC`,
            [campaignId]
        );
        return result.rows;
    } catch (error) {
        throw error;
    }
};

export const createProduct = async (nombre, tipo_producto_id, estado, destino, nota, campaign_id, usuario_id = null, estado_producto = 'libre') => {
    try {
        const result = await pool.query(
            `INSERT INTO producto (nombre, tipo_producto_id, estado, destino, nota, campaign_id, usuario_id, estado_producto)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
             RETURNING id, nombre, tipo_producto_id, estado, estado_producto, destino, nota, campaign_id, usuario_id`,
            [nombre, tipo_producto_id, estado, destino, nota, campaign_id, usuario_id, estado_producto]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

export const getTiposProducto = async () => {
    try {
        const result = await pool.query(
            `SELECT id, nombre FROM tipo_producto ORDER BY nombre`
        );
        return result.rows;
    } catch (error) {
        throw error;
    }
};

export const getProductById = async (productId) => {
    try {
        const result = await pool.query(
            `SELECT p.id, p.campaign_id, p.nombre, p.estado, p.estado_producto, p.destino, p.nota,
                    tp.nombre as tipo_nombre, tp.id as tipo_producto_id
             FROM producto p
             LEFT JOIN tipo_producto tp ON p.tipo_producto_id = tp.id
             WHERE p.id = $1`,
            [productId]
        );
        return result.rows[0] || null;
    } catch (error) {
        throw error;
    }
};

export const updateProduct = async (productId, nombre, tipo_producto_id, estado, estado_producto, destino, nota) => {
    try {
        const result = await pool.query(
            `UPDATE producto 
             SET nombre = $1, tipo_producto_id = $2, estado = $3, estado_producto = $4, destino = $5, nota = $6
             WHERE id = $7
             RETURNING id, nombre, tipo_producto_id, estado, estado_producto, destino, nota, campaign_id, usuario_id`,
            [nombre, tipo_producto_id, estado, estado_producto, destino, nota, productId]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

export const markProductsAsDelivered = async (productIds) => {
    try {
        if (!productIds || productIds.length === 0) {
            throw new Error('No se proporcionaron productos para marcar como entregados');
        }
        
        // Validar que todos los IDs sean números
        const numericIds = productIds.map(id => Number(id)).filter(id => !Number.isNaN(id));
        if (numericIds.length === 0) {
            throw new Error('No se proporcionaron IDs válidos');
        }
        
        // Crear placeholders dinámicos de forma segura
        const placeholders = numericIds.map((_, index) => `$${index + 1}`).join(', ');
        const query = `UPDATE producto 
                       SET estado_producto = 'entregado'
                       WHERE id IN (${placeholders})
                       RETURNING id, nombre, estado_producto`;
        
        const result = await pool.query(query, numericIds);
        return result.rows;
    } catch (error) {
        console.error('Error en markProductsAsDelivered:', error);
        throw error;
    }
};


