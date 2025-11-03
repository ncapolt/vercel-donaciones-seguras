import { Router } from "express";
import { getProductosByCampaignController } from "../controllers/producto.controller.js";

const router = Router();

// List products for a campaign
router.get("/productos/by-campaign/:campaignId", getProductosByCampaignController);

export default router;

