-- Migración inicial para TPI-TNT
-- Recrear tabla de jugadores con RLS habilitado y Realtime configurado

-- Eliminar tabla existente si existe (esto elimina todo: datos, políticas, triggers, etc.)
DROP TABLE IF EXISTS players CASCADE;

-- Crear la tabla de jugadores
CREATE TABLE players (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  score INTEGER NOT NULL DEFAULT 0,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para rendimiento
CREATE INDEX idx_players_score ON players(score DESC);
CREATE INDEX idx_players_user_id ON players(user_id);
CREATE INDEX idx_players_name ON players(name);

-- Habilitar RLS
ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad para el scoreboard
-- Permitir lectura a todos los usuarios autenticados
CREATE POLICY "scoreboard_authenticated_read" ON players
  FOR SELECT USING (auth.role() = 'authenticated');

-- Permitir inserción a usuarios autenticados
CREATE POLICY "scoreboard_authenticated_insert" ON players
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Permitir actualización a usuarios autenticados (simplificado)
CREATE POLICY "scoreboard_authenticated_update" ON players
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Permitir eliminación solo al propietario
CREATE POLICY "scoreboard_owner_delete" ON players
  FOR DELETE USING (auth.uid() = user_id);

-- Habilitar Realtime para la tabla players
ALTER PUBLICATION supabase_realtime ADD TABLE players;

-- Crear función para actualizar el timestamp automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear trigger para actualizar automáticamente updated_at
CREATE TRIGGER update_players_updated_at 
    BEFORE UPDATE ON players 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column(); 