-- Script para crear la tabla de campañas
CREATE TABLE IF NOT EXISTS campaigns (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  localidad VARCHAR(255) NOT NULL,
  provincia VARCHAR(255) NOT NULL,
  motivo TEXT NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT NOW()
);

-- Insertar algunas campañas de ejemplo
INSERT INTO campaigns (nombre, localidad, provincia, motivo) VALUES
('#TodosXBahía', 'Bahía Blanca', 'Buenos Aires', 'Ayuda para familias afectadas por inundaciones'),
('Abrigo para el alma', 'CABA', 'CABA', 'Recolección de abrigos para personas en situación de calle')
ON CONFLICT DO NOTHING;
