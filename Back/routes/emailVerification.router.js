import { Router } from "express";
import { 
    verificarEmail, 
    reenviarCodigo,
    enviarCodigoVerificacion,
    probarEmail
} from "../controllers/emailVerification.controller.js";

const router = Router();

// POST /api/verificacion/verificar - Verificar código de email
router.post("/verificar", verificarEmail);

// POST /api/verificacion/reenviar - Reenviar código de verificación
router.post("/reenviar", reenviarCodigo);

// POST /api/verificacion/enviar/:userId - Enviar código de verificación a usuario específico
router.post("/enviar/:userId", enviarCodigoVerificacion);

// GET /api/verificacion/probar - Probar configuración de email
router.get("/probar", probarEmail);

export default router;
