import fetch from 'node-fetch';

async function testSimple() {
    try {
        console.log('🧪 Probando servidor simple...');
        
        const response = await fetch('http://localhost:3001/api/registro-afectado', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: 'Test',
                apellido: 'Test',
                mail: 'test@test.com',
                contraseña: '123456',
                localidad: 'Buenos Aires',
                provincia: 'Buenos Aires'
            })
        });
        
        const data = await response.json();
        console.log('📊 Response:', data);
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

testSimple();
