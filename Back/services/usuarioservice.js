import pool from "../db.js";

const createUsuario = async (nombre, apellido, mail, localidad, provincia, contraseña) => {
    try {
        const result = await pool.query(`
        INSERT INTO usuarios (nombre, apellido, mail, localidad, provincia, contraseña)
        VALUES ($1, $2, $3, $4, $5, $6)`, [nombre, apellido, mail, localidad, provincia, contraseña]); 
    
        return result;
    
    } catch (error) {
        throw error; 
        }
    };

const loginUsuario = async (emailOrNombre, contraseña) => {
    try {
        const result = await pool.query(`
        SELECT id, nombre, apellido, email, localidad, provincia, tipo_usuario_id
        FROM usuarios 
        WHERE (email = $1 OR nombre = $1) AND contraseña = $2`, 
        [emailOrNombre, contraseña]);
    
        return result.rows[0];
    
    } catch (error) {
        throw error; 
        }
    };

const updateUsuario = async (id, nombre, apellido, email, localidad, provincia) => {
    try {
        const result = await pool.query(`
        UPDATE usuarios 
        SET nombre = $1, apellido = $2, email = $3, localidad = $4, provincia = $5
        WHERE id = $6
        RETURNING id, nombre, apellido, email, localidad, provincia, tipo_usuario_id`, 
        [nombre, apellido, email, localidad, provincia, id]);
    
        return result.rows[0];
    
    } catch (error) {
        throw error; 
        }
    };

export { createUsuario, loginUsuario, updateUsuario };
