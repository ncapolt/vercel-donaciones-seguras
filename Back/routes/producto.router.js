import { Router } from "express";
import { 
  getProductosByCampaignController, 
  createProductoController,
  getTiposProductoController,
  getProductoByIdController,
  updateProductoController,
  markProductsAsDeliveredController
} from "../controllers/producto.controller.js";

const router = Router();

// List products for a campaign
router.get("/productos/by-campaign/:campaignId", getProductosByCampaignController);

// Get single product by id
router.get("/productos/:id", getProductoByIdController);

// Create a new product
router.post("/productos", createProductoController);

// Update a product
router.put("/productos/:id", updateProductoController);

// Get product types
router.get("/tipos-producto", getTiposProductoController);

// Mark products as delivered
router.post("/productos/deliver", markProductsAsDeliveredController);

export default router;

