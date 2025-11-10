-- Script para agregar columna estado_producto a la tabla producto
-- Ejecutar en pgAdmin Query Tool

-- Agregar columna estado_producto si no existe
-- Valores posibles: 'libre', 'reservado', 'en_camino', 'en_destino', 'entregado'
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'producto' AND column_name = 'estado_producto') THEN
    ALTER TABLE producto ADD COLUMN estado_producto VARCHAR(20) DEFAULT 'libre';
    
    -- Agregar constraint para validar valores
    ALTER TABLE producto 
    ADD CONSTRAINT check_estado_producto 
    CHECK (estado_producto IN ('libre', 'reservado', 'en_camino', 'en_destino', 'entregado'));
  END IF;
END $$;

-- Verificar que se agregó correctamente
SELECT 
    column_name, 
    data_type, 
    column_default,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'producto' AND column_name = 'estado_producto';

