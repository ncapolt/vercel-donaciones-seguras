import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

// Probamos conexión al iniciar
pool.connect()
    .then(() => console.log("✅ Conectado correctamente a la Base de Datos."))
    .catch((err) => console.error("❌ Error al conectar con la Base de Datos.", err));

export default pool;
