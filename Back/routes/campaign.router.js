import { Router } from "express";
import { getCampaigns, createCampaignController, getCampaignByIdController } from "../controllers/campaign.controller.js";

const router = Router();

router.get("/campaigns", getCampaigns);
router.get("/campaigns/:id", getCampaignByIdController);
router.post("/campaigns", createCampaignController);

export default router;

