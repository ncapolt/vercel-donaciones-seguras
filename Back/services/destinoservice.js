import pool from "../db.js";

// Obtener todos los destinos
export const getDestinos = async () => {
    try {
        const result = await pool.query(
            `SELECT id, nombre, direccion, localidad, provincia, telefono, horario_atencion, created_at, updated_at
             FROM destino
             ORDER BY nombre ASC`
        );
        return result.rows;
    } catch (error) {
        throw error;
    }
};

// Obtener un destino por ID
export const getDestinoById = async (destinoId) => {
    try {
        const result = await pool.query(
            `SELECT id, nombre, direccion, localidad, provincia, telefono, horario_atencion, created_at, updated_at
             FROM destino
             WHERE id = $1`,
            [destinoId]
        );
        return result.rows[0] || null;
    } catch (error) {
        throw error;
    }
};

// Crear un nuevo destino
export const createDestino = async (nombre, direccion, localidad = null, provincia = null, telefono = null, horario_atencion = null) => {
    try {
        const result = await pool.query(
            `INSERT INTO destino (nombre, direccion, localidad, provincia, telefono, horario_atencion)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING id, nombre, direccion, localidad, provincia, telefono, horario_atencion, created_at, updated_at`,
            [nombre, direccion, localidad, provincia, telefono, horario_atencion]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

// Actualizar un destino
export const updateDestino = async (destinoId, nombre, direccion, localidad = null, provincia = null, telefono = null, horario_atencion = null) => {
    try {
        const result = await pool.query(
            `UPDATE destino 
             SET nombre = $1, direccion = $2, localidad = $3, provincia = $4, telefono = $5, horario_atencion = $6, updated_at = NOW()
             WHERE id = $7
             RETURNING id, nombre, direccion, localidad, provincia, telefono, horario_atencion, created_at, updated_at`,
            [nombre, direccion, localidad, provincia, telefono, horario_atencion, destinoId]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

// Eliminar un destino
export const deleteDestino = async (destinoId) => {
    try {
        const result = await pool.query(
            `DELETE FROM destino WHERE id = $1 RETURNING id`,
            [destinoId]
        );
        return result.rows[0] || null;
    } catch (error) {
        throw error;
    }
};

