import express from "express";
import cors from "cors";
import pool, { testConnection } from "./db.js";
import usuarioRouter from "./routes/usuario.router.js";
import authRouter from "./routes/auth.router.js";
import campaignRouter from "./routes/campaign.router.js";
import afectadoRouter from "./routes/afectado.router.js";

console.log('🔍 Importando afectadoRouter:', afectadoRouter);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

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

// 🟢 API Routes
console.log('🔍 Registrando rutas...');
app.use("/api/usuarios", usuarioRouter);
console.log('✅ Rutas de usuarios registradas');
app.use("/api", authRouter);
console.log('✅ Rutas de auth registradas');
app.use("/api", campaignRouter);
console.log('✅ Rutas de campaign registradas');
app.use("/api", afectadoRouter);
console.log('✅ Rutas de afectado registradas');

// Listar todas las rutas registradas
app._router.stack.forEach(function(r){
    if (r.route && r.route.path){
        console.log('📍 Ruta registrada:', r.route.path, Object.keys(r.route.methods));
    }
});

app.listen(port, async () => {
    console.log(`donaciones-seguras is listening at http://localhost:${port}`);
    await testConnection();
});

process.on('uncaughtException', (err) => {
    console.error('Error no capturado:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Promesa rechazada no manejada:', reason);
});
