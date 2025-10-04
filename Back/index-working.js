import express from "express";
import cors from "cors";
import pool from "./db.js";
import authRouter from "./routes/auth.router.js";
import afectadoRouter from "./routes/afectado.router.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

console.log('🔍 Iniciando servidor...');

app.get("/", (_, res) => {
    res.send("donaciones-seguras API working!");
});

app.get("/ping", async (_, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({
            message: "Conexión a la base de datos exitosa ✅",
            server_time: result.rows[0].now
        });
    } catch (error) {
        console.error("Error en /ping:", error);
        res.status(500).json({ error: "Error conectando a la base de datos ❌" });
    }
});

// Registrar routers
console.log('🔍 Registrando rutas de autenticación...');
app.use("/api", authRouter);
console.log('✅ Rutas de autenticación registradas');

console.log('🔍 Registrando rutas de afectados...');
app.use("/api", afectadoRouter);
console.log('✅ Rutas de afectados registradas');

app.listen(port, () => {
    console.log(`donaciones-seguras is listening at http://localhost:${port}`);
    console.log('🚀 Servidor listo para recibir peticiones');
});

process.on('uncaughtException', (err) => {
    console.error('Error no capturado:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Promesa rechazada no manejada:', reason);
});
