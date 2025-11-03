-- Crear tabla de productos vinculada a campañas
CREATE TABLE IF NOT EXISTS producto (
  id SERIAL PRIMARY KEY,
  campaign_id INTEGER NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  cantidad NUMERIC(12,2) DEFAULT 0,
  unidad VARCHAR(32) DEFAULT 'unidad',
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_producto_campaign FOREIGN KEY(campaign_id) REFERENCES campaign(id) ON DELETE CASCADE
);

-- Índices útiles
CREATE INDEX IF NOT EXISTS idx_producto_campaign ON producto(campaign_id);


