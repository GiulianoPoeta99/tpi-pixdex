-- Migración inicial para TPI-TNT
-- Este archivo contiene toda la configuración necesaria para la base de datos
-- Ejecutar en el SQL Editor de Supabase

-- =====================================================
-- TABLA DE JUGADORES
-- =====================================================

-- Crear la tabla de jugadores
CREATE TABLE IF NOT EXISTS players (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  score INTEGER NOT NULL DEFAULT 0,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ÍNDICES PARA RENDIMIENTO
-- =====================================================

-- Índice para ordenar por puntaje (scoreboard)
CREATE INDEX IF NOT EXISTS idx_players_score ON players(score DESC);

-- Índice para búsquedas por usuario
CREATE INDEX IF NOT EXISTS idx_players_user_id ON players(user_id);

-- Índice para búsquedas por nombre
CREATE INDEX IF NOT EXISTS idx_players_name ON players(name);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Habilitar RLS en la tabla
ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- POLÍTICAS DE SEGURIDAD
-- =====================================================

-- Eliminar políticas existentes si las hay
DROP POLICY IF EXISTS "scoreboard_public_read" ON players;
DROP POLICY IF EXISTS "scoreboard_authenticated_insert" ON players;
DROP POLICY IF EXISTS "scoreboard_owner_update" ON players;
DROP POLICY IF EXISTS "scoreboard_owner_delete" ON players;
DROP POLICY IF EXISTS "Lectura para usuarios autenticados" ON players;
DROP POLICY IF EXISTS "Inserción para usuarios autenticados" ON players;
DROP POLICY IF EXISTS "Actualización para usuarios autenticados" ON players;
DROP POLICY IF EXISTS "Eliminación solo por dueño" ON players;
DROP POLICY IF EXISTS "Lectura pública para usuarios autenticados" ON players;
DROP POLICY IF EXISTS "Actualización para dueños" ON players;
DROP POLICY IF EXISTS "Allow delete for record owner" ON players;
DROP POLICY IF EXISTS "Allow insert for authenticated users" ON players;
DROP POLICY IF EXISTS "Allow read access for authenticated users" ON players;
DROP POLICY IF EXISTS "Allow update for authenticated users" ON players;

-- Crear las políticas correctas
-- Política para permitir que TODOS los usuarios autenticados vean TODOS los jugadores
CREATE POLICY "scoreboard_public_read" ON players
  FOR SELECT USING (auth.role() = 'authenticated');

-- Política para permitir que usuarios autenticados creen jugadores
CREATE POLICY "scoreboard_authenticated_insert" ON players
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Política para permitir que usuarios autenticados actualicen jugadores
-- Solo pueden actualizar jugadores que ellos mismos crearon
CREATE POLICY "scoreboard_owner_update" ON players
  FOR UPDATE USING (auth.uid() = user_id);

-- Política para permitir que solo el dueño elimine sus jugadores
CREATE POLICY "scoreboard_owner_delete" ON players
  FOR DELETE USING (auth.uid() = user_id);

-- =====================================================
-- DATOS DE PRUEBA (OPCIONAL)
-- =====================================================

-- Insertar algunos jugadores de ejemplo (descomenta si quieres datos de prueba)
-- INSERT INTO players (name, score, user_id) VALUES 
--   ('Jugador1', 100, NULL),
--   ('Jugador2', 85, NULL),
--   ('Jugador3', 70, NULL);

-- =====================================================
-- VERIFICACIÓN FINAL
-- =====================================================

-- Verificar que la tabla se creó correctamente
SELECT 'Verificación de tabla:' as info;
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'players';

-- Verificar que las políticas se crearon correctamente
SELECT 'Verificación de políticas:' as info;
SELECT 
  policyname,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'players'
ORDER BY cmd;

-- Verificar que los índices se crearon correctamente
SELECT 'Verificación de índices:' as info;
SELECT 
  indexname,
  indexdef
FROM pg_indexes 
WHERE tablename = 'players';

-- Verificar que RLS está habilitado
SELECT 'Verificación de RLS:' as info;
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'players';

-- Mostrar estructura final de la tabla
SELECT 'Estructura de la tabla players:' as info;
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'players'
ORDER BY ordinal_position; 