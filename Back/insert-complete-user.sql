-- Script para insertar usuario completo desde signin-afectado
-- Ejecutar en pgAdmin Query Tool

-- Limpiar usuarios existentes
DELETE FROM usuarios;

-- Insertar usuario completo con todos los datos del formulario
INSERT INTO usuarios (
    nombre, 
    apellido, 
    email, 
    localidad, 
    provincia, 
    contraseña, 
    tipo_usuario_id
) VALUES (
    'Juan Carlos',           -- nombre
    'García López',          -- apellido  
    'juan.garcia@email.com', -- email
    'Buenos Aires',          -- localidad
    'Buenos Aires',          -- provincia
    '123456',                -- contraseña (texto plano)
    1                        -- tipo_usuario_id (1 = Afiliado)
);

-- Verificar que se insertó correctamente
SELECT 
    id,
    nombre,
    apellido, 
    email,
    localidad,
    provincia,
    tipo_usuario_id,
    fecha_registro
FROM usuarios;
