import pool from "../db.js";

const createCampaign = async (nombre, localidad, provincia, motivo) => {
    try {
        const result = await pool.query(`
        INSERT INTO campaign (nombre, localidad, provincia, motivo)
        VALUES ($1, $2, $3, $4) RETURNING id, nombre, localidad, provincia, motivo`, 
        [nombre, localidad, provincia, motivo]); 
    
        return result.rows[0];
    
    } catch (error) {
        throw error; 
        }
    };

const getAllCampaigns = async () => {
    try {
        const result = await pool.query(`
        SELECT id, nombre, localidad, provincia, motivo
        FROM campaign 
        ORDER BY id DESC`);
    
        return result.rows;
    
    } catch (error) {
        throw error; 
        }
    };

export { createCampaign, getAllCampaigns };

// New: fetch single campaign by id
export const getCampaignById = async (id) => {
    try {
        const result = await pool.query(
            `SELECT id, nombre, localidad, provincia, motivo FROM campaign WHERE id = $1`,
            [id]
        );
        return result.rows[0] || null;
    } catch (error) {
        throw error;
    }
};