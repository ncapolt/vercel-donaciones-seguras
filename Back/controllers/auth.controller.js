import pool from "../db.js";
import { loginUsuario } from "../services/usuarioservice.js";

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

