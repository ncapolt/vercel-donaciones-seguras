import express from 'express';
import afectadoRouter from './routes/afectado.router.js';

const app = express();
app.use(express.json());

console.log('🔍 Registrando rutas de prueba...');
app.use("/api", afectadoRouter);
console.log('✅ Rutas registradas');

app.listen(3002, () => {
    console.log('Servidor de prueba en puerto 3002');
    console.log('Rutas disponibles:');
    console.log('- POST /api/registro-afectado');
});
