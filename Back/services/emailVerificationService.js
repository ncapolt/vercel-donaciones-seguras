import pool from "../db.js";
import crypto from "crypto";
import { enviarEmailVerificacion as enviarEmailReal } from "./emailService.js";

// Generar código de verificación de 6 dígitos
export const generarCodigoVerificacion = () => {
    return crypto.randomInt(100000, 999999).toString();
};

// Generar código de verificación y guardarlo en la base de datos
export const crearCodigoVerificacion = async (userId) => {
    try {
        const codigo = generarCodigoVerificacion();
        const expiracion = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos

        await pool.query(`
            UPDATE usuarios 
            SET codigo_verificacion = $1, codigo_expiracion = $2
            WHERE id = $3
        `, [codigo, expiracion, userId]);

        return codigo;
    } catch (error) {
        throw error;
    }
};

// Verificar código de verificación
export const verificarCodigo = async (email, codigo) => {
    try {
        const result = await pool.query(`
            SELECT id, codigo_verificacion, codigo_expiracion, email_verificado
            FROM usuarios 
            WHERE email = $1
        `, [email]);

        if (result.rows.length === 0) {
            throw new Error('Usuario no encontrado');
        }

        const usuario = result.rows[0];

        if (usuario.email_verificado) {
            throw new Error('El email ya está verificado');
        }

        if (!usuario.codigo_verificacion || !usuario.codigo_expiracion) {
            throw new Error('No hay código de verificación pendiente');
        }

        if (new Date() > new Date(usuario.codigo_expiracion)) {
            throw new Error('El código de verificación ha expirado');
        }

        if (usuario.codigo_verificacion !== codigo) {
            throw new Error('Código de verificación incorrecto');
        }

        // Marcar email como verificado y limpiar código
        await pool.query(`
            UPDATE usuarios 
            SET email_verificado = TRUE, 
                codigo_verificacion = NULL, 
                codigo_expiracion = NULL
            WHERE id = $1
        `, [usuario.id]);

        return { success: true, message: 'Email verificado exitosamente' };
    } catch (error) {
        throw error;
    }
};

// Enviar email con código de verificación (REAL)
export const enviarEmailVerificacion = async (email, codigo) => {
    try {
        // Intentar enviar email real
        try {
            const result = await enviarEmailReal(email, codigo);
            return result;
        } catch (emailError) {
            // Si falla el envío real, mostrar el código en consola como fallback
            console.log(`⚠️ Error enviando email real, mostrando código en consola:`);
            console.log(`📧 Email: ${email}`);
            console.log(`🔐 Código de verificación: ${codigo}`);
            
            // Retornar éxito para no bloquear el flujo
            return { 
                success: true, 
                message: 'Email no enviado (error de configuración), código mostrado en consola',
                fallback: true
            };
        }
    } catch (error) {
        throw error;
    }
};

// Reenviar código de verificación
export const reenviarCodigoVerificacion = async (email) => {
    try {
        const result = await pool.query(`
            SELECT id, email_verificado
            FROM usuarios 
            WHERE email = $1
        `, [email]);

        if (result.rows.length === 0) {
            throw new Error('Usuario no encontrado');
        }

        const usuario = result.rows[0];

        if (usuario.email_verificado) {
            throw new Error('El email ya está verificado');
        }

        const codigo = await crearCodigoVerificacion(usuario.id);
        await enviarEmailVerificacion(email, codigo);

        return { success: true, message: 'Código reenviado exitosamente' };
    } catch (error) {
        throw error;
    }
};
