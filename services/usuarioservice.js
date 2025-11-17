import pool from "../db.js";
import bcrypt from "bcryptjs";

const createUsuario = async (nombre, apellido, email, localidad, provincia, contraseña, tipo_usuario_id = 1) => {
    try {
        // Hash de la contraseña para seguridad
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(contraseña, saltRounds);
        
        const result = await pool.query(`
        INSERT INTO usuarios (nombre, apellido, email, localidad, provincia, contraseña, tipo_usuario_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id, nombre, apellido, email, localidad, provincia, tipo_usuario_id`, 
        [nombre, apellido, email, localidad, provincia, hashedPassword, tipo_usuario_id]); 
    
        return result.rows[0];
    
    } catch (error) {
        throw error; 
        }
    };

const loginUsuario = async (emailOrNombre, contraseña) => {
    try {
        // Buscar usuario por email o nombre (sin verificar contraseña aún)
        const result = await pool.query(`
        SELECT id, nombre, apellido, email, localidad, provincia, tipo_usuario_id, contraseña
        FROM usuarios 
        WHERE email = $1 OR nombre = $1`, 
        [emailOrNombre]);
    
        if (result.rows.length === 0) {
            return null; // Usuario no encontrado
        }
        
        const usuario = result.rows[0];
        
        // Verificar contraseña usando bcrypt
        const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
        
        if (!contraseñaValida) {
            return null; // Contraseña incorrecta
        }
        
        // Remover la contraseña del objeto antes de devolverlo
        delete usuario.contraseña;
        return usuario;
    
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

const cambiarContraseña = async (userId, contraseñaVieja, contraseñaNueva) => {
    try {
        // Obtener el usuario con su contraseña actual
        const result = await pool.query(`
        SELECT id, contraseña
        FROM usuarios 
        WHERE id = $1`, 
        [userId]);
    
        if (result.rows.length === 0) {
            return { success: false, error: "Usuario no encontrado" };
        }
        
        const usuario = result.rows[0];
        
        // Verificar que la contraseña vieja sea correcta
        const contraseñaValida = await bcrypt.compare(contraseñaVieja, usuario.contraseña);
        
        if (!contraseñaValida) {
            return { success: false, error: "La contraseña actual es incorrecta" };
        }
        
        // Hashear la nueva contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(contraseñaNueva, saltRounds);
        
        // Actualizar la contraseña en la base de datos
        await pool.query(`
        UPDATE usuarios 
        SET contraseña = $1
        WHERE id = $2`, 
        [hashedPassword, userId]);
        
        return { success: true, message: "Contraseña actualizada exitosamente" };
    
    } catch (error) {
        throw error; 
        }
    };

const validarUsuario = async (emailOrNombre) => {
    try {
        // Buscar usuario por email o nombre
        const result = await pool.query(`
        SELECT id, nombre, apellido, email, localidad, provincia, tipo_usuario_id
        FROM usuarios 
        WHERE email = $1 OR nombre = $1`, 
        [emailOrNombre]);
    
        if (result.rows.length === 0) {
            return null; // Usuario no encontrado
        }
        
        return result.rows[0];
    
    } catch (error) {
        throw error; 
        }
    };

export { createUsuario, loginUsuario, updateUsuario, cambiarContraseña, validarUsuario };