import { getAllUsuarios, getUsuarioById } from "../models/usuario.model.js";
import { updateUsuario, createUsuario as createUsuarioService } from "../services/usuarioservice.js";

export async function getUsuarios(req, res) {
  try {
    const usuarios = await getAllUsuarios();
    res.json(usuarios);
  } catch (err) {
    console.error("getUsuarios:", err);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
}

export async function createUsuario(req, res) {
  try {
    const { nombre, apellido, email, localidad, provincia, contraseña, tipo_usuario_id } = req.body;
    
    // Validaciones requeridas
    if (!nombre || !apellido || !email || !localidad || !provincia || !contraseña) {
      return res.status(400).json({ 
        error: "Todos los campos son requeridos: nombre, apellido, email, localidad, provincia, contraseña" 
      });
    }

    // Validar longitud mínima de contraseña
    if (contraseña.length < 6) {
      return res.status(400).json({ 
        error: "La contraseña debe tener al menos 6 caracteres" 
      });
    }

    const nuevoUsuario = await createUsuarioService(
      nombre, 
      apellido, 
      email, 
      localidad, 
      provincia, 
      contraseña, 
      tipo_usuario_id || 1  // Default a tipo afectado si no se especifica
    );

    res.status(201).json({
      success: true,
      message: "Usuario creado exitosamente.",
      usuario: nuevoUsuario,
      requiereVerificacion: false
    });
  } catch (err) {
    console.error("createUsuario:", err);
    
    // Si es error de duplicado de email
    if (err.code === '23505' && err.constraint === 'usuarios_email_key') {
      return res.status(400).json({ error: "El email ya está registrado" });
    }
    
    res.status(500).json({ error: "Error al crear usuario" });
  }
}

export async function getUsuario(req, res) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "Id inválido" });

    const usuario = await getUsuarioById(id);
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json(usuario);
  } catch (err) {
    console.error("getUsuario:", err);
    res.status(500).json({ error: "Error al obtener usuario" });
  }
}

export async function updateUsuarioController(req, res) {
  try {
    const { id } = req.params;
    const { nombre, apellido, email, localidad, provincia } = req.body;
    
    if (!id) {
      return res.status(400).json({ error: "ID de usuario es requerido" });
    }
    
    if (!nombre || !apellido || !email || !localidad || !provincia) {
      return res.status(400).json({ 
        error: "Todos los campos son requeridos: nombre, apellido, email, localidad, provincia" 
      });
    }

    const usuarioActualizado = await updateUsuario(id, nombre, apellido, email, localidad, provincia);
    
    if (!usuarioActualizado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    
    res.json({
      success: true,
      message: "Usuario actualizado exitosamente",
      usuario: usuarioActualizado
    });
  } catch (err) {
    console.error("updateUsuario:", err);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
}
