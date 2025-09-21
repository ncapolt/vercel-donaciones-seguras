import pool from "../db.js";

const createONG = async (nombre, direccion, localidad, provincia) => {
    try {
        const result = await pool.query(`
        INSERT INTO ongs (nombre, direccion, localidad, provincia)
        VALUES ($1, $2, $3, $4)`, [nombre, direccion, localidad, provincia]); 
    
        return result;
    
    } catch (error) {
        throw error; 
        }
    };

export { createONG };
