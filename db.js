import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
const { Pool } = pkg;

// const pool = new Pool({
//     user: process.env.POSTGRES_USER,
//     host: process.env.POSTGRES_HOST,
//     database: process.env.POSTGRES_DATABASE,
//     password: process.env.POSTGRES_PASSWORD,
//     port: 5432,
//     ssl: {
//         rejectUnauthorized: false
//     },
//     connectionTimeoutMillis: 10000,
//     idleTimeoutMillis: 30000,
//     max: 20,
//     min: 0
// });

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    }
});

// Manejar errores de conexión
pool.on('error', (err) => {
    console.error('Error inesperado en el cliente de base de datos:', err);
});

// Función para probar la conexión
export async function testConnection() {
    try {
        const client = await pool.connect();
        console.log("✅ Conectado correctamente a la Base de Datos.");
        client.release();
        return true;
    } catch (err) {
        console.error("❌ Error al conectar con la Base de Datos.", err);
        return false;
    }
}

export default pool;
