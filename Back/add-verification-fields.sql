-- Script para agregar campos de verificación por email a la tabla usuarios
-- Ejecutar en pgAdmin Query Tool

-- Agregar campos de verificación
ALTER TABLE usuarios 
ADD COLUMN IF NOT EXISTS email_verificado BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS codigo_verificacion VARCHAR(6),
ADD COLUMN IF NOT EXISTS codigo_expiracion TIMESTAMP;

-- Crear índice para el código de verificación
CREATE INDEX IF NOT EXISTS idx_usuarios_codigo_verificacion ON usuarios(codigo_verificacion);

-- Comentarios para documentar los campos
COMMENT ON COLUMN usuarios.email_verificado IS 'Indica si el email del usuario ha sido verificado';
COMMENT ON COLUMN usuarios.codigo_verificacion IS 'Código de 6 dígitos para verificar el email';
COMMENT ON COLUMN usuarios.codigo_expiracion IS 'Timestamp de expiración del código de verificación';

