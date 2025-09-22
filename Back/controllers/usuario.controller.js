import { getAllUsuarios, insertUsuario, getUsuarioById } from "../models/usuario.model.js";
import { updateUsuario } from "../services/usuarioservice.js";

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
    const { nombre, email, telefono, tipo_usuario_id } = req.body;
    if (!nombre || !email) return res.status(400).json({ error: "Falta nombre o email" });

    const nuevo = await insertUsuario({ nombre, email, telefono: telefono || null, tipo_usuario_id: tipo_usuario_id || null });
    res.status(201).json(nuevo);
  } catch (err) {
    console.error("createUsuario:", err);
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
