import { Router } from "express";
import { getUsuarios, createUsuario, getUsuario, updateUsuarioController } from "../controllers/usuario.controller.js";

const router = Router();

router.get("/", getUsuarios);
router.post("/", createUsuario);
router.get("/:id", getUsuario);
router.put("/:id", updateUsuarioController);

export default router;
