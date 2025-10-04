// Test simple para verificar las rutas
import express from 'express';

const app = express();
app.use(express.json());

// Simular la ruta
app.post('/api/registro-afectado', (req, res) => {
    console.log('✅ Ruta encontrada!');
    console.log('📝 Datos:', req.body);
    res.json({ success: true, message: 'Ruta funcionando' });
});

app.listen(3001, () => {
    console.log('Servidor de prueba en puerto 3001');
});
