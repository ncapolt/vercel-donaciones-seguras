import { Router } from "express";
import {
    getDestinosController,
    getDestinoByIdController,
    createDestinoController,
    updateDestinoController,
    deleteDestinoController
} from "../controllers/destino.controller.js";

const router = Router();

// Obtener todos los destinos
router.get("/destinos", getDestinosController);

// Obtener un destino por ID
router.get("/destinos/:id", getDestinoByIdController);

// Crear un nuevo destino
router.post("/destinos", createDestinoController);

// Actualizar un destino
router.put("/destinos/:id", updateDestinoController);

// Eliminar un destino
router.delete("/destinos/:id", deleteDestinoController);

export default router;

