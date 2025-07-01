-- Migración inicial para TPI-TNT
-- Crear tabla de jugadores con RLS habilitado

-- Crear la tabla de jugadores
CREATE TABLE IF NOT EXISTS players (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  score INTEGER NOT NULL DEFAULT 0,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para rendimiento
CREATE INDEX IF NOT EXISTS idx_players_score ON players(score DESC);
CREATE INDEX IF NOT EXISTS idx_players_user_id ON players(user_id);
CREATE INDEX IF NOT EXISTS idx_players_name ON players(name);

-- Habilitar RLS
ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad
CREATE POLICY "scoreboard_public_read" ON players
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "scoreboard_authenticated_insert" ON players
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "scoreboard_owner_update" ON players
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "scoreboard_owner_delete" ON players
  FOR DELETE USING (auth.uid() = user_id); 