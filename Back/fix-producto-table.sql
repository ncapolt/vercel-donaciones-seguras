-- Script para crear/corregir las tablas de productos
-- Ejecutar en pgAdmin Query Tool

-- 1. Crear tabla tipo_producto si no existe
CREATE TABLE IF NOT EXISTS tipo_producto (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) UNIQUE NOT NULL
);

-- 2. Insertar tipos de producto iniciales (ignorar si ya existen)
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

-- 3. Crear tabla producto si no existe
CREATE TABLE IF NOT EXISTS producto (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255),
  tipo_producto_id INTEGER,
  estado CHAR(1) DEFAULT 'N',
  destino TEXT,
  nota TEXT,
  campaign_id INTEGER,
  usuario_id INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 4. Agregar columnas que puedan faltar (sin error si ya existen)
DO $$ 
BEGIN
  -- tipo_producto_id
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'producto' AND column_name = 'tipo_producto_id') THEN
    ALTER TABLE producto ADD COLUMN tipo_producto_id INTEGER;
  END IF;
  
  -- estado
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'producto' AND column_name = 'estado') THEN
    ALTER TABLE producto ADD COLUMN estado CHAR(1) DEFAULT 'N';
  END IF;
  
  -- destino
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'producto' AND column_name = 'destino') THEN
    ALTER TABLE producto ADD COLUMN destino TEXT;
  END IF;
  
  -- nota
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'producto' AND column_name = 'nota') THEN
    ALTER TABLE producto ADD COLUMN nota TEXT;
  END IF;
  
  -- usuario_id
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'producto' AND column_name = 'usuario_id') THEN
    ALTER TABLE producto ADD COLUMN usuario_id INTEGER;
  END IF;
  
  -- campaign_id
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'producto' AND column_name = 'campaign_id') THEN
    ALTER TABLE producto ADD COLUMN campaign_id INTEGER;
  END IF;
  
  -- nombre
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'producto' AND column_name = 'nombre') THEN
    ALTER TABLE producto ADD COLUMN nombre VARCHAR(255);
  END IF;
END $$;

-- 5. Eliminar constraints existentes si hay problemas (opcional, comentar si no es necesario)
-- DROP CONSTRAINT IF EXISTS fk_producto_tipo_producto;
-- DROP CONSTRAINT IF EXISTS fk_producto_campaign;
-- DROP CONSTRAINT IF EXISTS fk_producto_usuario;

-- 6. Agregar foreign keys (ignorar si ya existen)
DO $$
BEGIN
  -- FK a tipo_producto
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_producto_tipo_producto') THEN
    BEGIN
      ALTER TABLE producto
      ADD CONSTRAINT fk_producto_tipo_producto 
      FOREIGN KEY (tipo_producto_id) REFERENCES tipo_producto(id) 
      ON DELETE RESTRICT;
    EXCEPTION WHEN OTHERS THEN
      RAISE NOTICE 'Constraint fk_producto_tipo_producto ya existe o hay un error';
    END;
  END IF;
  
  -- FK a campaign (asegúrate de que la tabla campaign existe)
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_producto_campaign') THEN
    BEGIN
      ALTER TABLE producto
      ADD CONSTRAINT fk_producto_campaign 
      FOREIGN KEY (campaign_id) REFERENCES campaign(id) 
      ON DELETE CASCADE;
    EXCEPTION WHEN OTHERS THEN
      RAISE NOTICE 'Constraint fk_producto_campaign ya existe o hay un error: %', SQLERRM;
    END;
  END IF;
  
  -- FK a usuarios (opcional)
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_producto_usuario') THEN
    BEGIN
      ALTER TABLE producto
      ADD CONSTRAINT fk_producto_usuario 
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) 
      ON DELETE SET NULL;
    EXCEPTION WHEN OTHERS THEN
      RAISE NOTICE 'Constraint fk_producto_usuario ya existe o hay un error';
    END;
  END IF;
END $$;

-- 7. Crear índices
CREATE INDEX IF NOT EXISTS idx_producto_tipo ON producto(tipo_producto_id);
CREATE INDEX IF NOT EXISTS idx_producto_estado ON producto(estado);
CREATE INDEX IF NOT EXISTS idx_producto_campaign ON producto(campaign_id);
CREATE INDEX IF NOT EXISTS idx_producto_usuario ON producto(usuario_id);

-- 8. Verificar estructura
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'producto' 
ORDER BY ordinal_position;

-- 9. Verificar que tipo_producto tiene datos
SELECT * FROM tipo_producto;

