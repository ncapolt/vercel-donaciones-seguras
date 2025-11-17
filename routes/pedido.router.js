import { Router } from "express";
import {
    createPedidoController,
    getPedidoByCodigoController,
    getPedidoByIdController,
    getProductosByPedidoController,
    entregarPedidoController,
    getProductosDisponiblesController,
    getPedidosByUsuarioController
} from "../controllers/pedido.controller.js";

const router = Router();

// Crear un nuevo pedido
router.post("/pedidos", createPedidoController);

// Buscar pedido por código de reserva (debe ir antes de /pedidos/:pedidoId)
router.get("/pedidos/codigo/:codigo", getPedidoByCodigoController);

// Obtener productos disponibles para pedidos
router.get("/pedidos/disponibles/:campaignId", getProductosDisponiblesController);

// Obtener pedidos de un usuario
router.get("/pedidos/usuario/:usuarioId", getPedidosByUsuarioController);

// Obtener productos de un pedido (debe ir antes de /pedidos/:pedidoId)
router.get("/pedidos/:pedidoId/productos", getProductosByPedidoController);

// Entregar pedido (debe ir antes de /pedidos/:pedidoId)
router.post("/pedidos/:pedidoId/entregar", entregarPedidoController);

// Obtener pedido por ID (debe ir al final)
router.get("/pedidos/:pedidoId", getPedidoByIdController);

export default router;
