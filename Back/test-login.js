// Test del endpoint de login
import fetch from 'node-fetch';

async function testLogin() {
    try {
        console.log('🧪 Probando endpoint de login...');
        
        const loginData = {
            emailOrNombre: 'Juan Carlos',
            contraseña: '123456'
        };
        
        console.log('📝 Enviando datos de login:', JSON.stringify(loginData, null, 2));
        
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
        });
        
        console.log('📊 Status Code:', response.status);
        console.log('📊 Status Text:', response.statusText);
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Login exitoso:', data);
        } else {
            const errorText = await response.text();
            console.log('❌ Error en login:', errorText);
        }
        
    } catch (error) {
        console.error('❌ Error de conexión:', error.message);
    }
}

testLogin();
