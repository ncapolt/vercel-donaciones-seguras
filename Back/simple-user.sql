-- Script simple para insertar usuario de prueba
-- Ejecutar en pgAdmin Query Tool

-- Limpiar usuarios existentes
DELETE FROM usuarios;

-- Insertar usuario de prueba con contraseña simple
INSERT INTO usuarios (nombre, apellido, email, localidad, provincia, contraseña, tipo_usuario_id) VALUES 
('TestUser', 'TestApellido', 'test@test.com', 'Buenos Aires', 'Buenos Aires', '123456', 1);

-- Verificar que se insertó correctamente
SELECT id, nombre, apellido, email, localidad, provincia, tipo_usuario_id FROM usuarios;
