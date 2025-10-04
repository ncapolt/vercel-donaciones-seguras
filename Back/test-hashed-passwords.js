// Test del sistema de hashing de contraseñas
import fetch from 'node-fetch';

async function testHashedPasswords() {
    try {
        console.log('🔐 Probando sistema de hashing de contraseñas...');
        
        const userData = {
            nombre: 'Usuario Hasheado',
            apellido: 'Test Seguro',
            mail: 'testhashed@test.com',
            contraseña: 'miPassword123',
            localidad: 'Buenos Aires',
            provincia: 'Buenos Aires'
        };
        
        console.log('📝 Creando usuario con contraseña hasheada...');
        console.log('Contraseña original:', userData.contraseña);
        
        // Crear usuario
        const createResponse = await fetch('http://localhost:3000/api/registro-afectado', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        
        console.log('📊 Status creación:', createResponse.status);
        
        if (createResponse.ok) {
            const createData = await createResponse.json();
            console.log('✅ Usuario creado:', createData.usuario.nombre);
            
            // Ahora probar login con la contraseña original
            console.log('\n🔐 Probando login con contraseña original...');
            
            const loginData = {
                emailOrNombre: 'Usuario Hasheado',
                contraseña: 'miPassword123' // Misma contraseña original
            };
            
            const loginResponse = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });
            
            console.log('📊 Status login:', loginResponse.status);
            
            if (loginResponse.ok) {
                const loginData = await loginResponse.json();
                console.log('✅ Login exitoso con contraseña hasheada!');
                console.log('Usuario:', loginData.usuario.nombre);
            } else {
                const errorText = await loginResponse.text();
                console.log('❌ Error en login:', errorText);
            }
            
            // Probar con contraseña incorrecta
            console.log('\n🔐 Probando con contraseña incorrecta...');
            
            const wrongLoginData = {
                emailOrNombre: 'Usuario Hasheado',
                contraseña: 'contraseñaIncorrecta'
            };
            
            const wrongLoginResponse = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(wrongLoginData)
            });
            
            console.log('📊 Status login incorrecto:', wrongLoginResponse.status);
            
            if (wrongLoginResponse.status === 401) {
                console.log('✅ Correctamente rechazó contraseña incorrecta');
            } else {
                console.log('❌ Debería haber rechazado la contraseña incorrecta');
            }
            
        } else {
            const errorText = await createResponse.text();
            console.log('❌ Error creando usuario:', errorText);
        }
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

testHashedPasswords();
