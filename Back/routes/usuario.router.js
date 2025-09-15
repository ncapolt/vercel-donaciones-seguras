import { Router } from "express";
import { getUsuarios, createUsuario, getUsuario } from "../controllers/usuario.controller.js";

const router = Router();

router.get("/", getUsuarios);
router.post("/", createUsuario);
router.get("/:id", getUsuario);

export default router;
