// Verificar si el servidor está corriendo
import fetch from 'node-fetch';

async function checkServer() {
    try {
        console.log('🔍 Verificando servidor...');
        
        // Probar endpoint básico
        const pingResponse = await fetch('http://localhost:3000/ping');
        console.log('📊 Ping status:', pingResponse.status);
        
        if (pingResponse.ok) {
            const pingData = await pingResponse.json();
            console.log('✅ Servidor funcionando:', pingData.message);
        }
        
        // Probar endpoint de login (que sabemos que funciona)
        const loginResponse = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ emailOrNombre: 'test', contraseña: 'test' })
        });
        console.log('📊 Login status:', loginResponse.status);
        
        // Probar endpoint de registro
        const registroResponse = await fetch('http://localhost:3000/api/registro-afectado', {
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
        console.log('📊 Registro status:', registroResponse.status);
        
        if (!registroResponse.ok) {
            const errorText = await registroResponse.text();
            console.log('❌ Error response:', errorText);
        }
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

checkServer();
