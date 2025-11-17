import pool from "../db.js";

export async function getAllUsuarios() {
  const res = await pool.query("SELECT id, nombre, email, telefono, fecha_registro, tipo_usuario_id FROM usuarios ORDER BY id");
  return res.rows;
}

export async function insertUsuario({ nombre, email, telefono, tipo_usuario_id }) {
  const res = await pool.query(
    `INSERT INTO usuarios (nombre, email, telefono, tipo_usuario_id, fecha_registro)
     VALUES ($1, $2, $3, $4, NOW()) RETURNING id, nombre, email, telefono, fecha_registro, tipo_usuario_id`,
    [nombre, email, telefono, tipo_usuario_id]
  );
  return res.rows[0];
}

export async function getUsuarioById(id) {
  const res = await pool.query(
    `SELECT id, nombre, email, telefono, fecha_registro, tipo_usuario_id FROM usuarios WHERE id = $1`,
    [id]
  );
  return res.rows[0];
}
