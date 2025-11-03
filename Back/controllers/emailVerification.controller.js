import { 
    verificarCodigo, 
    reenviarCodigoVerificacion,
    crearCodigoVerificacion,
    enviarEmailVerificacion
} from "../services/emailVerificationService.js";
import { probarConfiguracionEmail } from "../services/emailService.js";

// Verificar código de email
export async function verificarEmail(req, res) {
    try {
        const { email, codigo } = req.body;

        if (!email || !codigo) {
            return res.status(400).json({ 
                error: "Email y código son requeridos" 
            });
        }

        const result = await verificarCodigo(email, codigo);
        res.json(result);
    } catch (error) {
        console.error("Error verificando email:", error);
        res.status(400).json({ 
            error: error.message 
        });
    }
}

// Reenviar código de verificación
export async function reenviarCodigo(req, res) {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ 
                error: "Email es requerido" 
            });
        }

        const result = await reenviarCodigoVerificacion(email);
        res.json(result);
    } catch (error) {
        console.error("Error reenviando código:", error);
        res.status(400).json({ 
            error: error.message 
        });
    }
}

// Generar y enviar código de verificación para un usuario existente
export async function enviarCodigoVerificacion(req, res) {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ 
                error: "ID de usuario es requerido" 
            });
        }

        const codigo = await crearCodigoVerificacion(userId);
        
        // Aquí necesitarías obtener el email del usuario
        // Por simplicidad, asumimos que tienes el email
        const result = await pool.query(`
            SELECT email FROM usuarios WHERE id = $1
        `, [userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ 
                error: "Usuario no encontrado" 
            });
        }

        const email = result.rows[0].email;
        await enviarEmailVerificacion(email, codigo);

        res.json({
            success: true,
            message: "Código de verificación enviado exitosamente"
        });
    } catch (error) {
        console.error("Error enviando código de verificación:", error);
        res.status(500).json({ 
            error: "Error interno del servidor" 
        });
    }
}

// Probar configuración de email
export async function probarEmail(req, res) {
    try {
        const result = await probarConfiguracionEmail();
        
        if (result.success) {
            res.json(result);
        } else {
            res.status(500).json(result);
        }
    } catch (error) {
        console.error("Error probando configuración de email:", error);
        res.status(500).json({ 
            error: "Error probando configuración de email" 
        });
    }
}
