import express from "express";
import cors from "cors";
import pool from "./db.js"; // 👈 Importación única del pool

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 🟢 Ruta base
app.get("/", (_, res) => {
    res.send("donaciones-seguras API working!");
});

// 🟢 Ruta para probar la conexión a la base de datos
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

// 🟢 Ruta para listar tablas en el esquema public
app.get("/test", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT tablename 
            FROM pg_catalog.pg_tables 
            WHERE schemaname = 'public';
        `);

        res.json({
            success: true,
            tables: result.rows
        });
    } catch (error) {
        console.error("Error ejecutando /test:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(port, () => {
    console.log(`donaciones-seguras is listening at http://localhost:${port}`);
});








/* import express from "express";


import cors from "cors";
const app = express();
const port = 3000;
import './db.js';


app.use(cors());

// import diagnosticoRouter from "./routes/diagnostico.router.js" 
// import medicoRouter from "./routes/medico.router.js"
// import pacienteRouter from "./routes/paciente.router.js"
// import authRouter from "./routes/auth.router.js"
// import imagesRouter from "./routes/images.router.js"


app.use(express.json());

app.get("/", (_, res) => {
    res.send("donaciones-seguras API working!");
});

// //ROUTER DIAGNOSTICO
// app.use("/diagnostico", diagnosticoRouter);

// //ROUTER MEDICO
// app.use("/medico", medicoRouter);

// //ROUTER PACIENTE
// app.use("/paciente", pacienteRouter);

// //ROUTER AUTH
// app.use("/auth", authRouter); 

// //ROUTER IMAGES
// app.use("/images", imagesRouter);


app.listen(port, () => {
    console.log(`donaciones-seguras is listening at http://localhost:${port}`);
});
 */