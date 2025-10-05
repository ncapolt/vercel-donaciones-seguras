import { Router } from "express";
import { getCurrentUser, login, cambiarContraseñaController, validarUsuarioController } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", login);
router.get("/user", getCurrentUser);
router.post("/cambiar-password", cambiarContraseñaController);
router.post("/validar-usuario", validarUsuarioController);

export default router;

