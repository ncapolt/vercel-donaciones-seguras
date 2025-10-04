// Verificar usuarios en la base de datos
import pool from './db.js';

async function checkUsers() {
    try {
        console.log('🔍 Verificando usuarios en la base de datos...');
        
        const result = await pool.query(`
            SELECT id, nombre, apellido, email, contraseña, tipo_usuario_id 
            FROM usuarios 
            ORDER BY id DESC 
            LIMIT 5
        `);
        
        console.log('📊 Usuarios encontrados:');
        result.rows.forEach((user, index) => {
            console.log(`${index + 1}. ID: ${user.id}, Nombre: ${user.nombre}, Email: ${user.email}, Contraseña: ${user.contraseña}, Tipo: ${user.tipo_usuario_id}`);
        });
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        process.exit(0);
    }
}

checkUsers();
