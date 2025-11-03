import pool from "../db.js";

export const getProductsByCampaign = async (campaignId) => {
    try {
        const result = await pool.query(
            `SELECT id, campaign_id, nombre, descripcion, cantidad, unidad, created_at
             FROM producto
             WHERE campaign_id = $1
             ORDER BY id DESC`,
            [campaignId]
        );
        return result.rows;
    } catch (error) {
        throw error;
    }
};


