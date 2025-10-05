import pool from "../db.js";
import { loginUsuario, cambiarContraseña, validarUsuario } from "../services/usuarioservice.js";

export async function login(req, res) {
  try {
    const { emailOrNombre, contraseña } = req.body;

    if (!emailOrNombre || !contraseña) {
      return res.status(400).json({ 
        error: "Email/Nombre y contraseña son requeridos" 
      });
    }

    const usuario = await loginUsuario(emailOrNombre, contraseña);

    if (!usuario) {
      return res.status(401).json({ 
        error: "Credenciales inválidas" 
      });
    }

    // En una aplicación real, aquí generarías un JWT token
    res.json({
      success: true,
      message: "Login exitoso",
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        localidad: usuario.localidad,
        provincia: usuario.provincia,
        tipo_usuario_id: usuario.tipo_usuario_id
      }
    });

  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function getCurrentUser(req, res) {
  try {
    // For now, return a mock user. In a real app, this would get user from JWT token
    res.json({ 
      name: "Usuario Demo",
      id: 1,
      email: "demo@example.com"
    });
  } catch (err) {
    console.error("getCurrentUser:", err);
    res.status(500).json({ error: "Error al obtener usuario actual" });
  }
}

export async function cambiarContraseñaController(req, res) {
  try {
    const { userId, contraseñaVieja, contraseñaNueva } = req.body;

    if (!userId || !contraseñaVieja || !contraseñaNueva) {
      return res.status(400).json({ 
        error: "Todos los campos son requeridos" 
      });
    }

    if (contraseñaNueva.length < 6) {
      return res.status(400).json({ 
        error: "La nueva contraseña debe tener al menos 6 caracteres" 
      });
    }

    const resultado = await cambiarContraseña(userId, contraseñaVieja, contraseñaNueva);

    if (!resultado.success) {
      return res.status(400).json({ error: resultado.error });
    }

    res.json({
      success: true,
      message: resultado.message
    });

  } catch (err) {
    console.error("Error al cambiar contraseña:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function validarUsuarioController(req, res) {
  try {
    const { emailOrNombre } = req.body;

    if (!emailOrNombre) {
      return res.status(400).json({ 
        error: "Email o nombre es requerido" 
      });
    }

    const usuario = await validarUsuario(emailOrNombre);

    if (!usuario) {
      return res.status(404).json({ 
        error: "Usuario no encontrado" 
      });
    }

    res.json({
      success: true,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        localidad: usuario.localidad,
        provincia: usuario.provincia,
        tipo_usuario_id: usuario.tipo_usuario_id
      }
    });

  } catch (err) {
    console.error("Error al validar usuario:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

