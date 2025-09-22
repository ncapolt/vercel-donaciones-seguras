import { Router } from "express";
import { getCampaigns, createCampaignController } from "../controllers/campaign.controller.js";

const router = Router();

router.get("/campaigns", getCampaigns);
router.post("/campaigns", createCampaignController);

export default router;

