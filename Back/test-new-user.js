// Test crear usuario nuevo sin hashing
import fetch from 'node-fetch';

async function testNewUser() {
    try {
        console.log('🧪 Probando registro de usuario nuevo...');
        
        const userData = {
            nombre: 'Usuario Nuevo',
            apellido: 'Sin Hashing',
            mail: 'testnuevo@test.com',
            contraseña: 'password123',
            localidad: 'Buenos Aires',
            provincia: 'Buenos Aires'
        };
        
        console.log('📝 Creando usuario:', JSON.stringify(userData, null, 2));
        
        // Crear usuario
        const createResponse = await fetch('http://localhost:3000/api/registro-afectado', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        
        console.log('📊 Status creación:', createResponse.status);
        
        if (createResponse.ok) {
            const createData = await createResponse.json();
            console.log('✅ Usuario creado:', createData);
            
            // Ahora probar login con la misma contraseña
            console.log('\n🧪 Probando login con la misma contraseña...');
            
            const loginData = {
                emailOrNombre: 'Usuario Nuevo',
                contraseña: 'password123'
            };
            
            const loginResponse = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });
            
            console.log('📊 Status login:', loginResponse.status);
            
            if (loginResponse.ok) {
                const loginData = await loginResponse.json();
                console.log('✅ Login exitoso:', loginData);
            } else {
                const errorText = await loginResponse.text();
                console.log('❌ Error en login:', errorText);
            }
            
        } else {
            const errorText = await createResponse.text();
            console.log('❌ Error creando usuario:', errorText);
        }
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

testNewUser();
