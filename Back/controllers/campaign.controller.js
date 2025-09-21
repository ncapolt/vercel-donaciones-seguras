import { createCampaign, getAllCampaigns } from "../services/campaignservice.js";

export async function getCampaigns(req, res) {
  try {
    const campaigns = await getAllCampaigns();
    res.json(campaigns);
  } catch (err) {
    console.error("getCampaigns:", err);
    res.status(500).json({ error: "Error al obtener campañas" });
  }
}

export async function createCampaignController(req, res) {
  try {
    const { nombre, localidad, provincia, motivo } = req.body;
    
    if (!nombre || !localidad || !provincia || !motivo) {
      return res.status(400).json({ 
        error: "Todos los campos son requeridos: nombre, localidad, provincia, motivo" 
      });
    }

    const newCampaign = await createCampaign(nombre, localidad, provincia, motivo);
    
    res.status(201).json({
      success: true,
      message: "Campaña creada exitosamente",
      campaign: newCampaign
    });
  } catch (err) {
    console.error("createCampaign:", err);
    res.status(500).json({ error: "Error al crear campaña" });
  }
}
