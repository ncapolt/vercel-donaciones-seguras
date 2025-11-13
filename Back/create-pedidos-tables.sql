-- Crear tabla de pedidos
CREATE TABLE IF NOT EXISTS pedido (
  id SERIAL PRIMARY KEY,
  codigo_reserva VARCHAR(6) UNIQUE NOT NULL,
  usuario_id INTEGER NOT NULL,
  campaign_id INTEGER NOT NULL,
  estado VARCHAR(50) DEFAULT 'pendiente',
  fecha_creacion TIMESTAMP DEFAULT NOW(),
  fecha_entrega TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_pedido_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  CONSTRAINT fk_pedido_campaign FOREIGN KEY (campaign_id) REFERENCES campaign(id) ON DELETE CASCADE
);

-- Crear tabla de productos en pedidos
CREATE TABLE IF NOT EXISTS pedido_producto (
  id SERIAL PRIMARY KEY,
  pedido_id INTEGER NOT NULL,
  producto_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_pedido_producto_pedido FOREIGN KEY (pedido_id) REFERENCES pedido(id) ON DELETE CASCADE,
  CONSTRAINT fk_pedido_producto_producto FOREIGN KEY (producto_id) REFERENCES producto(id) ON DELETE CASCADE,
  UNIQUE(pedido_id, producto_id)
);

-- Crear índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_pedido_codigo ON pedido(codigo_reserva);
CREATE INDEX IF NOT EXISTS idx_pedido_usuario ON pedido(usuario_id);
CREATE INDEX IF NOT EXISTS idx_pedido_campaign ON pedido(campaign_id);
CREATE INDEX IF NOT EXISTS idx_pedido_producto_pedido ON pedido_producto(pedido_id);
CREATE INDEX IF NOT EXISTS idx_pedido_producto_producto ON pedido_producto(producto_id);

-- Función para generar código de 6 dígitos único
CREATE OR REPLACE FUNCTION generar_codigo_reserva() 
RETURNS VARCHAR(6) AS $$
DECLARE
  codigo VARCHAR(6);
  existe BOOLEAN;
BEGIN
  LOOP
    -- Generar código aleatorio de 6 dígitos
    codigo := LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
    
    -- Verificar si el código ya existe
    SELECT EXISTS(SELECT 1 FROM pedido WHERE codigo_reserva = codigo) INTO existe;
    
    -- Si no existe, salir del loop
    EXIT WHEN NOT existe;
  END LOOP;
  
  RETURN codigo;
END;
$$ LANGUAGE plpgsql;


