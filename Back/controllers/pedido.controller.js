import {
    createPedido,
    getPedidoByCodigo,
    getPedidoById,
    getProductosByPedido,
    entregarPedido,
    getProductosDisponibles,
    getPedidosByUsuario
} from "../services/pedidoservice.js";

export async function createPedidoController(req, res) {
    try {
        const { usuario_id, campaign_id, producto_ids } = req.body;

        if (!usuario_id || !campaign_id || !producto_ids || !Array.isArray(producto_ids) || producto_ids.length === 0) {
            return res.status(400).json({
                error: "Campos requeridos: usuario_id, campaign_id, producto_ids (array no vacío)"
            });
        }

        const pedido = await createPedido(usuario_id, campaign_id, producto_ids);

        res.status(201).json({
            success: true,
            message: "Pedido creado exitosamente",
            pedido: pedido
        });
    } catch (err) {
        console.error("createPedido:", err);
        res.status(500).json({
            error: "Error al crear pedido",
            details: err.message
        });
    }
}

export async function getPedidoByCodigoController(req, res) {
    try {
        const { codigo } = req.params;

        if (!codigo || codigo.length !== 6) {
            return res.status(400).json({
                error: "El código de reserva debe tener 6 dígitos"
            });
        }

        const pedido = await getPedidoByCodigo(codigo);

        if (!pedido) {
            return res.status(404).json({
                error: "Pedido no encontrado"
            });
        }

        res.json({
            success: true,
            pedido: pedido
        });
    } catch (err) {
        console.error("getPedidoByCodigo:", err);
        res.status(500).json({
            error: "Error al buscar pedido",
            details: err.message
        });
    }
}

export async function getPedidoByIdController(req, res) {
    try {
        const { pedidoId } = req.params;
        const numericId = Number(pedidoId);

        if (Number.isNaN(numericId)) {
            return res.status(400).json({
                error: "ID de pedido inválido"
            });
        }

        const pedido = await getPedidoById(numericId);

        if (!pedido) {
            return res.status(404).json({
                error: "Pedido no encontrado"
            });
        }

        res.json({
            success: true,
            pedido: pedido
        });
    } catch (err) {
        console.error("getPedidoById:", err);
        res.status(500).json({
            error: "Error al obtener pedido",
            details: err.message
        });
    }
}

export async function getProductosByPedidoController(req, res) {
    try {
        const { pedidoId } = req.params;
        const numericId = Number(pedidoId);

        if (Number.isNaN(numericId)) {
            return res.status(400).json({
                error: "ID de pedido inválido"
            });
        }

        const productos = await getProductosByPedido(numericId);

        res.json({
            success: true,
            productos: productos
        });
    } catch (err) {
        console.error("getProductosByPedido:", err);
        res.status(500).json({
            error: "Error al obtener productos del pedido",
            details: err.message
        });
    }
}

export async function entregarPedidoController(req, res) {
    try {
        const { pedidoId } = req.params;
        const { producto_ids } = req.body;

        const numericId = Number(pedidoId);
        if (Number.isNaN(numericId)) {
            return res.status(400).json({
                error: "ID de pedido inválido"
            });
        }

        if (!producto_ids || !Array.isArray(producto_ids) || producto_ids.length === 0) {
            return res.status(400).json({
                error: "Se requiere un array de IDs de productos"
            });
        }

        const pedido = await entregarPedido(numericId, producto_ids);

        res.json({
            success: true,
            message: "Pedido marcado como entregado exitosamente",
            pedido: pedido
        });
    } catch (err) {
        console.error("entregarPedido:", err);
        res.status(500).json({
            error: "Error al entregar pedido",
            details: err.message
        });
    }
}

export async function getProductosDisponiblesController(req, res) {
    try {
        const { campaignId } = req.params;
        const numericId = Number(campaignId);

        if (Number.isNaN(numericId)) {
            return res.status(400).json({
                error: "ID de campaña inválido"
            });
        }

        const productos = await getProductosDisponibles(numericId);

        res.json({
            success: true,
            productos: productos
        });
    } catch (err) {
        console.error("getProductosDisponibles:", err);
        res.status(500).json({
            error: "Error al obtener productos disponibles",
            details: err.message
        });
    }
}

export async function getPedidosByUsuarioController(req, res) {
    try {
        const { usuarioId } = req.params;
        const numericId = Number(usuarioId);

        if (Number.isNaN(numericId)) {
            return res.status(400).json({
                error: "ID de usuario inválido"
            });
        }

        const pedidos = await getPedidosByUsuario(numericId);

        res.json({
            success: true,
            pedidos: pedidos
        });
    } catch (err) {
        console.error("getPedidosByUsuario:", err);
        res.status(500).json({
            error: "Error al obtener pedidos del usuario",
            details: err.message
        });
    }
}

