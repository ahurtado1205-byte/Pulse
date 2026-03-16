-- Esquema Inicial AHT Pulse

-- 1. Tabla de Operaciones Diarias
CREATE TABLE IF NOT EXISTS operaciones_diarias (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  fecha date NOT NULL,
  habitaciones_vendidas integer NOT NULL DEFAULT 0,
  adr_diario decimal(10,2) NOT NULL DEFAULT 0,
  nuevas_reservas integer NOT NULL DEFAULT 0,
  cancelaciones integer NOT NULL DEFAULT 0,
  origen_predominante text,
  evento_atractor text,
  hotel_id integer,
  created_at timestamp with time zone DEFAULT now()
);

-- Políticas de Seguridad (RLS) opcionales por ahora:
-- ALTER TABLE operaciones_diarias ENABLE ROW LEVEL SECURITY;
