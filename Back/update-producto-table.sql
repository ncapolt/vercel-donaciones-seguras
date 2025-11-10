-- Script para actualizar la tabla producto con los campos necesarios
-- Ejecutar en pgAdmin Query Tool

-- 1. Crear tabla tipo_producto si no existe
CREATE TABLE IF NOT EXISTS tipo_producto (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) UNIQUE NOT NULL
);

-- 2. Insertar tipos de producto iniciales
INSERT INTO tipo_producto (nombre) VALUES
('Ropa'),
('Limpieza'),
('Alimentos'),
('Medicamentos'),
('Juguetes'),
('Electrónica'),
('Muebles'),
('Calzado'),
('Higiene Personal')
ON CONFLICT (nombre) DO NOTHING;

-- 3. Agregar columnas que falten a la tabla producto
-- Verificar y agregar tipo_producto_id si no existe
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'producto' AND column_name = 'tipo_producto_id') THEN
        ALTER TABLE producto ADD COLUMN tipo_producto_id INTEGER;
    END IF;
END
$$;

-- Verificar y agregar estado si no existe (char para 'N' nuevo, 'U' usado)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'producto' AND column_name = 'estado') THEN
        ALTER TABLE producto ADD COLUMN estado CHAR(1) DEFAULT 'N';
    END IF;
END
$$;

-- Verificar y agregar destino si no existe
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'producto' AND column_name = 'destino') THEN
        ALTER TABLE producto ADD COLUMN destino TEXT;
    END IF;
END
$$;

-- Verificar y agregar nota/observaciones si no existe
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'producto' AND column_name = 'nota') THEN
        ALTER TABLE producto ADD COLUMN nota TEXT;
    END IF;
END
$$;

-- Verificar y agregar usuario_id si no existe
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'producto' AND column_name = 'usuario_id') THEN
        ALTER TABLE producto ADD COLUMN usuario_id INTEGER;
    END IF;
END
$$;

-- Verificar y agregar campaign_id si no existe
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'producto' AND column_name = 'campaign_id') THEN
        ALTER TABLE producto ADD COLUMN campaign_id INTEGER;
    END IF;
END
$$;

-- Verificar y agregar nombre si no existe
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'producto' AND column_name = 'nombre') THEN
        ALTER TABLE producto ADD COLUMN nombre VARCHAR(255);
    END IF;
END
$$;

-- 4. Agregar foreign keys si no existen
-- FK a tipo_producto
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_producto_tipo_producto') THEN
        ALTER TABLE producto
        ADD CONSTRAINT fk_producto_tipo_producto 
        FOREIGN KEY (tipo_producto_id) REFERENCES tipo_producto(id) 
        ON DELETE RESTRICT;
    END IF;
END
$$;

-- FK a campaign
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_producto_campaign') THEN
        ALTER TABLE producto
        ADD CONSTRAINT fk_producto_campaign 
        FOREIGN KEY (campaign_id) REFERENCES campaign(id) 
        ON DELETE CASCADE;
    END IF;
END
$$;

-- FK a usuarios (opcional, si quieres asociar productos a usuarios)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_producto_usuario') THEN
        ALTER TABLE producto
        ADD CONSTRAINT fk_producto_usuario 
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id) 
        ON DELETE SET NULL;
    END IF;
END
$$;

-- 5. Crear índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_producto_tipo ON producto(tipo_producto_id);
CREATE INDEX IF NOT EXISTS idx_producto_estado ON producto(estado);
CREATE INDEX IF NOT EXISTS idx_producto_campaign ON producto(campaign_id);
CREATE INDEX IF NOT EXISTS idx_producto_usuario ON producto(usuario_id);

-- 6. Verificar estructura final
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'producto' 
ORDER BY ordinal_position;

