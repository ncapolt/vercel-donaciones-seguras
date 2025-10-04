import fetch from 'node-fetch';

async function testEndpoint() {
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
        
        console.log('📝 Enviando datos:', testData);
        
        const response = await fetch('http://localhost:3000/api/registro-afectado', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });
        
        console.log('📊 Status:', response.status);
        console.log('📊 Headers:', response.headers.raw());
        
        const data = await response.json();
        console.log('📊 Response:', data);
        
        if (response.ok) {
            console.log('✅ Endpoint funcionando correctamente!');
        } else {
            console.log('❌ Error en el endpoint:', data);
        }
        
    } catch (error) {
        console.error('❌ Error de conexión:', error.message);
    }
}

testEndpoint();
