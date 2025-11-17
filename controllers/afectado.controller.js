import pool from "../db.js";
import bcrypt from "bcryptjs";
import { createUsuario } from "../services/usuarioservice.js";

export async function registrarAfectado(req, res) {
  try {
    console.log('🔍 Petición recibida en registrarAfectado');
    console.log('📝 Datos recibidos:', req.body);
    
    const { nombre, apellido, mail, contraseña, localidad, provincia } = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (!nombre || !apellido || !mail || !contraseña || !localidad || !provincia) {
      return res.status(400).json({ 
        error: "Todos los campos son requeridos: nombre, apellido, mail, contraseña, localidad, provincia" 
      });
    }

    // Verificar si el usuario ya existe (por email o nombre)
    const existingUser = await pool.query(
      'SELECT id FROM usuarios WHERE email = $1 OR nombre = $2',
      [mail, nombre]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ 
        error: "Ya existe un usuario con este email o nombre" 
      });
    }

    // Usar el servicio createUsuario
    const nuevoUsuario = await createUsuario(
      nombre, 
      apellido, 
      mail, 
      localidad, 
      provincia, 
      contraseña, 
      1 // tipo_usuario_id = 1 para afectados
    );

    res.status(201).json({
      success: true,
      message: "Usuario afectado registrado exitosamente",
      usuario: {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        apellido: nuevoUsuario.apellido,
        email: nuevoUsuario.email,
        localidad: nuevoUsuario.localidad,
        provincia: nuevoUsuario.provincia,
        tipo_usuario_id: nuevoUsuario.tipo_usuario_id
      }
    });

  } catch (err) {
    console.error("Error en registro de afectado:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
