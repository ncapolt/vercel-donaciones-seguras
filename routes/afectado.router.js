import { Router } from "express";
import { registrarAfectado } from "../controllers/afectado.controller.js";

const router = Router();

router.post("/registro-afectado", registrarAfectado);

export default router;
