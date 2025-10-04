// Verificar el último usuario creado
import pool from './db.js';

async function checkLastUser() {
    try {
        console.log('🔍 Verificando último usuario creado...');
        
        const result = await pool.query(`
            SELECT id, nombre, apellido, email, contraseña, tipo_usuario_id 
            FROM usuarios 
            WHERE id = 8
        `);
        
        if (result.rows.length > 0) {
            const user = result.rows[0];
            console.log('📊 Usuario encontrado:');
            console.log(`ID: ${user.id}`);
            console.log(`Nombre: ${user.nombre}`);
            console.log(`Email: ${user.email}`);
            console.log(`Contraseña guardada: "${user.contraseña}"`);
            console.log(`Tipo: ${user.tipo_usuario_id}`);
            console.log(`Longitud de contraseña: ${user.contraseña.length} caracteres`);
        } else {
            console.log('❌ Usuario no encontrado');
        }
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        process.exit(0);
    }
}

checkLastUser();
