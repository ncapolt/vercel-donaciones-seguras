import {
    getDestinos,
    getDestinoById,
    createDestino,
    updateDestino,
    deleteDestino
} from "../services/destinoservice.js";

export async function getDestinosController(req, res) {
    try {
        const destinos = await getDestinos();
        res.json({
            success: true,
            destinos: destinos
        });
    } catch (err) {
        console.error("getDestinos:", err);
        res.status(500).json({
            error: "Error al obtener destinos",
            details: err.message
        });
    }
}

export async function getDestinoByIdController(req, res) {
    try {
        const { id } = req.params;
        const numericId = Number(id);

        if (Number.isNaN(numericId)) {
            return res.status(400).json({
                error: "ID de destino inválido"
            });
        }

        const destino = await getDestinoById(numericId);

        if (!destino) {
            return res.status(404).json({
                error: "Destino no encontrado"
            });
        }

        res.json({
            success: true,
            destino: destino
        });
    } catch (err) {
        console.error("getDestinoById:", err);
        res.status(500).json({
            error: "Error al obtener destino",
            details: err.message
        });
    }
}

export async function createDestinoController(req, res) {
    try {
        const { nombre, direccion, localidad, provincia, telefono, horario_atencion } = req.body;

        if (!nombre || !direccion) {
            return res.status(400).json({
                error: "Campos requeridos: nombre, direccion"
            });
        }

        const nuevoDestino = await createDestino(nombre, direccion, localidad, provincia, telefono, horario_atencion);

        res.status(201).json({
            success: true,
            message: "Destino creado exitosamente",
            destino: nuevoDestino
        });
    } catch (err) {
        console.error("createDestino:", err);
        res.status(500).json({
            error: "Error al crear destino",
            details: err.message
        });
    }
}

export async function updateDestinoController(req, res) {
    try {
        const { id } = req.params;
        const { nombre, direccion, localidad, provincia, telefono, horario_atencion } = req.body;

        const numericId = Number(id);
        if (Number.isNaN(numericId)) {
            return res.status(400).json({
                error: "ID de destino inválido"
            });
        }

        if (!nombre || !direccion) {
            return res.status(400).json({
                error: "Campos requeridos: nombre, direccion"
            });
        }

        const destinoActualizado = await updateDestino(numericId, nombre, direccion, localidad, provincia, telefono, horario_atencion);

        if (!destinoActualizado) {
            return res.status(404).json({
                error: "Destino no encontrado"
            });
        }

        res.json({
            success: true,
            message: "Destino actualizado exitosamente",
            destino: destinoActualizado
        });
    } catch (err) {
        console.error("updateDestino:", err);
        res.status(500).json({
            error: "Error al actualizar destino",
            details: err.message
        });
    }
}

export async function deleteDestinoController(req, res) {
    try {
        const { id } = req.params;
        const numericId = Number(id);

        if (Number.isNaN(numericId)) {
            return res.status(400).json({
                error: "ID de destino inválido"
            });
        }

        const destinoEliminado = await deleteDestino(numericId);

        if (!destinoEliminado) {
            return res.status(404).json({
                error: "Destino no encontrado"
            });
        }

        res.json({
            success: true,
            message: "Destino eliminado exitosamente"
        });
    } catch (err) {
        console.error("deleteDestino:", err);
        res.status(500).json({
            error: "Error al eliminar destino",
            details: err.message
        });
    }
}

