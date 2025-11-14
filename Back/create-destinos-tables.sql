-- Crear tabla de destinos (puntos de recolección)
CREATE TABLE IF NOT EXISTS destino (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  direccion TEXT NOT NULL,
  localidad VARCHAR(100),
  provincia VARCHAR(100),
  telefono VARCHAR(50),
  horario_atencion TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Crear índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_destino_nombre ON destino(nombre);
CREATE INDEX IF NOT EXISTS idx_destino_localidad ON destino(localidad);

-- Insertar algunos destinos de ejemplo (opcional)
INSERT INTO destino (nombre, direccion, localidad, provincia) VALUES
('Comunidad Amijai', 'Arribenos 2355, CABA', 'CABA', 'Buenos Aires')
ON CONFLICT DO NOTHING;

