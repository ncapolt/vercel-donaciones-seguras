// Debug de rutas
import express from 'express';

const app = express();
app.use(express.json());

console.log('🔍 Iniciando debug de rutas...');

// Test 1: Ruta básica
app.get('/test', (req, res) => {
    res.json({ message: 'Test route working' });
});

// Test 2: Importar router
try {
    console.log('📦 Importando afectadoRouter...');
    const afectadoRouter = await import('./routes/afectado.router.js');
    console.log('✅ Router importado:', afectadoRouter.default);
    
    console.log('📦 Registrando router...');
    app.use("/api", afectadoRouter.default);
    console.log('✅ Router registrado');
    
} catch (error) {
    console.error('❌ Error importando router:', error.message);
    console.error('❌ Stack:', error.stack);
}

// Test 3: Listar rutas
app._router.stack.forEach(function(r){
    if (r.route && r.route.path){
        console.log('📍 Ruta registrada:', r.route.path, Object.keys(r.route.methods));
    }
});

app.listen(3003, () => {
    console.log('Servidor de debug en puerto 3003');
});
