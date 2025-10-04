// Test del endpoint de registro
import fetch from 'node-fetch';

async function testRegistro() {
    try {
        console.log('🧪 Probando endpoint de registro...');
        
        const testData = {
            nombre: 'Test Frontend',
            apellido: 'Test Apellido',
            mail: 'testfrontend@test.com',
            contraseña: '123456',
            localidad: 'Buenos Aires',
            provincia: 'Buenos Aires'
        };
        
        console.log('📝 Enviando datos:', JSON.stringify(testData, null, 2));
        
        const response = await fetch('http://localhost:3000/api/registro-afectado', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });
        
        console.log('📊 Status Code:', response.status);
        console.log('📊 Status Text:', response.statusText);
        console.log('📊 Headers:', Object.fromEntries(response.headers.entries()));
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Respuesta exitosa:', data);
        } else {
            const errorText = await response.text();
            console.log('❌ Error response:', errorText);
        }
        
    } catch (error) {
        console.error('❌ Error de conexión:', error.message);
        console.error('❌ Stack:', error.stack);
    }
}

testRegistro();
