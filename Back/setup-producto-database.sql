-- Script SIMPLIFICADO para crear las tablas de productos
-- Ejecutar este script completo en pgAdmin Query Tool
-- Este script es más seguro y maneja errores mejor

-- ============================================
-- PASO 1: Crear tabla tipo_producto
-- ============================================
CREATE TABLE IF NOT EXISTS tipo_producto (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) UNIQUE NOT NULL
);

-- Insertar tipos de producto
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

-- ============================================
-- PASO 2: Verificar/crear tabla producto
-- ============================================
-- Primero, eliminar la tabla producto si existe y tiene estructura incorrecta
-- (COMENTA ESTAS LÍNEAS si ya tienes datos importantes)
-- DROP TABLE IF EXISTS producto CASCADE;

-- Crear tabla producto desde cero (sin foreign keys primero)
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

-- Agregar columnas que puedan faltar
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'producto' AND column_name = 'nombre') THEN
    ALTER TABLE producto ADD COLUMN nombre VARCHAR(255);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'producto' AND column_name = 'tipo_producto_id') THEN
    ALTER TABLE producto ADD COLUMN tipo_producto_id INTEGER;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'producto' AND column_name = 'estado') THEN
    ALTER TABLE producto ADD COLUMN estado CHAR(1) DEFAULT 'N';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'producto' AND column_name = 'destino') THEN
    ALTER TABLE producto ADD COLUMN destino TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'producto' AND column_name = 'nota') THEN
    ALTER TABLE producto ADD COLUMN nota TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'producto' AND column_name = 'campaign_id') THEN
    ALTER TABLE producto ADD COLUMN campaign_id INTEGER;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'producto' AND column_name = 'usuario_id') THEN
    ALTER TABLE producto ADD COLUMN usuario_id INTEGER;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'producto' AND column_name = 'created_at') THEN
    ALTER TABLE producto ADD COLUMN created_at TIMESTAMP DEFAULT NOW();
  END IF;
END $$;

-- ============================================
-- PASO 3: Agregar foreign keys (solo si las columnas existen)
-- ============================================
-- Foreign key a tipo_producto
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'producto' AND column_name = 'tipo_producto_id') THEN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_producto_tipo_producto') THEN
      ALTER TABLE producto
      ADD CONSTRAINT fk_producto_tipo_producto 
      FOREIGN KEY (tipo_producto_id) REFERENCES tipo_producto(id) ON DELETE RESTRICT;
    END IF;
  END IF;
END $$;

-- Foreign key a campaign (verifica si tu tabla se llama "campaign" o "campaigns")
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'producto' AND column_name = 'campaign_id') THEN
    -- Opción A: Si tu tabla se llama "campaign" (sin 's')
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'campaign') THEN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_producto_campaign') THEN
        ALTER TABLE producto
        ADD CONSTRAINT fk_producto_campaign 
        FOREIGN KEY (campaign_id) REFERENCES campaign(id) ON DELETE CASCADE;
      END IF;
    -- Opción B: Si tu tabla se llama "campaigns" (con 's')
    ELSIF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'campaigns') THEN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_producto_campaigns') THEN
        ALTER TABLE producto
        ADD CONSTRAINT fk_producto_campaigns 
        FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE;
      END IF;
    END IF;
  END IF;
END $$;

-- Foreign key a usuarios (opcional - solo si la columna existe)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'producto' AND column_name = 'usuario_id') THEN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'usuarios') THEN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_producto_usuario') THEN
        ALTER TABLE producto
        ADD CONSTRAINT fk_producto_usuario 
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL;
      END IF;
    END IF;
  END IF;
END $$;

-- ============================================
-- PASO 5: Crear índices
-- ============================================
CREATE INDEX IF NOT EXISTS idx_producto_tipo ON producto(tipo_producto_id);
CREATE INDEX IF NOT EXISTS idx_producto_estado ON producto(estado);
CREATE INDEX IF NOT EXISTS idx_producto_campaign ON producto(campaign_id);
CREATE INDEX IF NOT EXISTS idx_producto_usuario ON producto(usuario_id);

-- ============================================
-- PASO 6: Verificar que todo esté bien
-- ============================================
-- Ver estructura de producto
SELECT 'Estructura de tabla producto:' as info;
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'producto' 
ORDER BY ordinal_position;

-- Ver tipos de producto
SELECT 'Tipos de producto:' as info;
SELECT * FROM tipo_producto;

-- Verificar constraints
SELECT 'Foreign keys:' as info;
SELECT conname, conrelid::regclass, confrelid::regclass
FROM pg_constraint
WHERE conrelid = 'producto'::regclass AND contype = 'f';

