import { getProductsByCampaign } from "../services/productoservice.js";

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


