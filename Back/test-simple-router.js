// Test simple del router
import express from 'express';

const app = express();
app.use(express.json());

console.log('🔍 Iniciando test simple...');

// Importar y registrar router
const afectadoRouter = await import('./routes/afectado.router.js');
app.use("/api", afectadoRouter.default);

console.log('✅ Router registrado');

app.listen(3004, () => {
    console.log('Servidor de test en puerto 3004');
    console.log('Probando endpoint...');
    
    // Test automático
    setTimeout(async () => {
        try {
            const response = await fetch('http://localhost:3004/api/registro-afectado', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre: 'Test',
                    apellido: 'Test',
                    mail: 'test@test.com',
                    contraseña: '123456',
                    localidad: 'Buenos Aires',
                    provincia: 'Buenos Aires'
                })
            });
            
            console.log('📊 Status:', response.status);
            const data = await response.text();
            console.log('📊 Response:', data);
            
        } catch (error) {
            console.error('❌ Error:', error.message);
        }
    }, 1000);
});
