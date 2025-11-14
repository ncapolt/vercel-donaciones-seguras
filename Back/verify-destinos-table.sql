-- Script para verificar que la tabla destino existe y tiene datos
-- Ejecutar en pgAdmin Query Tool

-- Verificar que la tabla existe
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'destino' 
ORDER BY ordinal_position;

-- Ver todos los destinos
SELECT * FROM destino;

-- Si la tabla está vacía, insertar un destino de ejemplo
INSERT INTO destino (nombre, direccion, localidad, provincia) 
VALUES ('Comunidad Amijai', 'Arribenos 2355, CABA', 'CABA', 'Buenos Aires')
ON CONFLICT DO NOTHING;

-- Verificar nuevamente
SELECT COUNT(*) as total_destinos FROM destino;

