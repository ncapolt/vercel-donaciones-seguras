import express from "express";
import cors from "cors";
import pool, { testConnection } from "./db.js";
import usuarioRouter from "./routes/usuario.router.js";
import authRouter from "./routes/auth.router.js";
import campaignRouter from "./routes/campaign.router.js";
import productoRouter from "./routes/producto.router.js";
import pedidoRouter from "./routes/pedido.router.js";
import destinoRouter from "./routes/destino.router.js";
import afectadoRouter from "./routes/afectado.router.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ruta base
app.get("/", (_, res) => {
    res.send("donaciones-seguras API working!");
});

// Ruta para probar la conexión a la base de datos
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

// API Routes

try {
    app.use("/api/usuarios", usuarioRouter);
    console.log('✅ Rutas de usuarios registradas');
} catch (error) {
    console.error('❌ Error registrando rutas de usuarios:', error.message);
}

try {
    app.use("/api", authRouter);
    console.log('✅ Rutas de auth registradas');
} catch (error) {
    console.error('❌ Error registrando rutas de auth:', error.message);
}

try {
    app.use("/api", campaignRouter);
    console.log('✅ Rutas de campaign registradas');
} catch (error) {
    console.error('❌ Error registrando rutas de campaign:', error.message);
}

try {
    app.use("/api", afectadoRouter);
    console.log('✅ Rutas de afectado registradas');
} catch (error) {
    console.error('❌ Error registrando rutas de afectado:', error.message);
}

try {
    app.use("/api", productoRouter);
    console.log('✅ Rutas de producto registradas');
} catch (error) {
    console.error('❌ Error registrando rutas de producto:', error.message);
}

try {
    app.use("/api", pedidoRouter);
    console.log('✅ Rutas de pedido registradas');
} catch (error) {
    console.error('❌ Error registrando rutas de pedido:', error.message);
}

try {
    app.use("/api", destinoRouter);
    console.log('✅ Rutas de destino registradas');
} catch (error) {
    console.error('❌ Error registrando rutas de destino:', error.message);
}

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
