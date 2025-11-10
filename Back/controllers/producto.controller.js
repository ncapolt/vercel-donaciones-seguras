import { getProductsByCampaign, createProduct, getTiposProducto, getProductById, updateProduct } from "../services/productoservice.js";

export async function getProductosByCampaignController(req, res) {
  try {
    const { campaignId } = req.params;
    const numericId = Number(campaignId);
    if (Number.isNaN(numericId)) {
      return res.status(400).json({ error: "ID de campaña inválido" });
    }

    const productos = await getProductsByCampaign(numericId);
    res.json(productos);
  } catch (err) {
    console.error("getProductosByCampaign:", err);
    res.status(500).json({ error: "Error al obtener productos" });
  }
}

export async function createProductoController(req, res) {
  try {
    const { nombre, tipo_producto_id, estado, destino, nota, campaign_id, usuario_id } = req.body;

    if (!nombre || !tipo_producto_id || !estado || !destino || !campaign_id) {
      return res.status(400).json({ 
        error: "Campos requeridos: nombre, tipo_producto_id, estado, destino, campaign_id" 
      });
    }

    const nuevoProducto = await createProduct(
      nombre,
      tipo_producto_id,
      estado,
      destino,
      nota || null,
      campaign_id,
      usuario_id || null
    );

    res.status(201).json({
      success: true,
      message: "Producto creado exitosamente",
      producto: nuevoProducto
    });
  } catch (err) {
    console.error("createProducto:", err);
    console.error("Error details:", err.message);
    console.error("Error stack:", err.stack);
    res.status(500).json({ 
      error: "Error al crear producto",
      details: err.message 
    });
  }
}

export async function getTiposProductoController(req, res) {
  try {
    const tipos = await getTiposProducto();
    res.json(tipos);
  } catch (err) {
    console.error("getTiposProducto:", err);
    console.error("Error details:", err.message);
    console.error("Error stack:", err.stack);
    res.status(500).json({ 
      error: "Error al obtener tipos de producto",
      details: err.message 
    });
  }
}

export async function getProductoByIdController(req, res) {
  try {
    const { id } = req.params;
    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
      return res.status(400).json({ error: "ID de producto inválido" });
    }

    const producto = await getProductById(numericId);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(producto);
  } catch (err) {
    console.error("getProductoById:", err);
    res.status(500).json({ error: "Error al obtener producto" });
  }
}

export async function updateProductoController(req, res) {
  try {
    const { id } = req.params;
    const { nombre, tipo_producto_id, estado, estado_producto, destino, nota } = req.body;

    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
      return res.status(400).json({ error: "ID de producto inválido" });
    }

    if (!nombre || !tipo_producto_id || !estado || !destino) {
      return res.status(400).json({ 
        error: "Campos requeridos: nombre, tipo_producto_id, estado, destino" 
      });
    }

    // Validar estado_producto si se proporciona
    const estadosValidos = ['libre', 'reservado', 'en_camino', 'en_destino', 'entregado'];
    const estadoProductoFinal = estado_producto || 'libre';
    if (!estadosValidos.includes(estadoProductoFinal)) {
      return res.status(400).json({ 
        error: "Estado de producto inválido. Debe ser uno de: libre, reservado, en_camino, en_destino, entregado" 
      });
    }

    const productoActualizado = await updateProduct(
      numericId,
      nombre,
      tipo_producto_id,
      estado,
      estadoProductoFinal,
      destino,
      nota || null
    );

    if (!productoActualizado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json({
      success: true,
      message: "Producto actualizado exitosamente",
      producto: productoActualizado
    });
  } catch (err) {
    console.error("updateProducto:", err);
    res.status(500).json({ error: "Error al actualizar producto" });
  }
}


