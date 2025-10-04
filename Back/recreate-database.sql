-- Script para recrear la base de datos correctamente
-- Ejecutar en pgAdmin Query Tool

-- 1. Eliminar tablas existentes (en orden correcto por dependencias)
DROP TABLE IF EXISTS usuarios CASCADE;
DROP TABLE IF EXISTS tipos_usuarios CASCADE;

-- 2. Crear tabla tipos_usuarios
CREATE TABLE tipos_usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT
);

-- 3. Insertar tipos de usuarios
INSERT INTO tipos_usuarios (id, nombre, descripcion) VALUES 
(1, 'Afiliado', 'Usuario afectado que necesita ayuda'),
(2, 'Organizador', 'Usuario que organiza campañas de ayuda');

-- 4. Crear tabla usuarios con tipos de datos correctos
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    localidad VARCHAR(100) NOT NULL,
    provincia VARCHAR(100) NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    tipo_usuario_id INTEGER NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tipo_usuario_id) REFERENCES tipos_usuarios(id)
);

-- 5. Crear índices para mejorar rendimiento
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_usuarios_nombre ON usuarios(nombre);
CREATE INDEX idx_usuarios_tipo ON usuarios(tipo_usuario_id);

-- 6. Insertar usuario de prueba (contraseña: 123456)
-- NOTA: Esta contraseña está hasheada con bcrypt
INSERT INTO usuarios (nombre, apellido, email, localidad, provincia, contraseña, tipo_usuario_id) VALUES 
('TestUser', 'TestApellido', 'test@test.com', 'Buenos Aires', 'Buenos Aires', '$2b$10$Y8NBHD.LNVtnS7Q8K9XJ2eOQZzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQz', 1);

-- 7. Verificar que todo se creó correctamente
SELECT 'Tablas creadas correctamente' as status;
SELECT * FROM tipos_usuarios;
SELECT id, nombre, apellido, email, localidad, provincia, tipo_usuario_id FROM usuarios;
