# Configuración de Supabase para TPI-TNT

Este documento explica cómo configurar Supabase para el proyecto TPI-TNT con autenticación y funcionalidades de tiempo real.

## 1. Crear proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Crea una cuenta o inicia sesión
3. Crea un nuevo proyecto
4. Anota la URL del proyecto y la anon key

## 2. Configurar variables de entorno

1. Copia el archivo `.env.example` a `.env`
2. Reemplaza los valores con tus credenciales reales:

```env
EXPO_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

## 3. Configurar la base de datos

### 3.1 Crear la tabla de jugadores

Ejecuta el siguiente SQL en el SQL Editor de Supabase:

```sql
-- Crear tabla de jugadores
CREATE TABLE players (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  score INTEGER NOT NULL DEFAULT 0,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejor rendimiento
CREATE INDEX idx_players_score ON players(score DESC);
CREATE INDEX idx_players_user_id ON players(user_id);
CREATE INDEX idx_players_name ON players(name);

-- Habilitar Row Level Security (RLS)
ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad
-- Permitir lectura a todos los usuarios autenticados
CREATE POLICY "Allow read access for authenticated users" ON players
  FOR SELECT USING (auth.role() = 'authenticated');

-- Permitir inserción a usuarios autenticados
CREATE POLICY "Allow insert for authenticated users" ON players
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Permitir actualización a usuarios autenticados
CREATE POLICY "Allow update for authenticated users" ON players
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Permitir eliminación solo al propietario del registro
CREATE POLICY "Allow delete for record owner" ON players
  FOR DELETE USING (auth.uid() = user_id);
```

### 3.2 Habilitar Realtime

1. Ve a Database > Replication
2. Habilita la replicación en tiempo real para la tabla `players`

## 4. Configurar autenticación

### 4.1 Habilitar proveedores OAuth

1. Ve a Authentication > Providers
2. Habilita los proveedores que desees usar:
   - **Google**: Configura Client ID y Client Secret
   - **GitHub**: Configura Client ID y Client Secret
   - **Discord**: Configura Client ID y Client Secret

### 4.2 Configurar URLs de redirección

Para cada proveedor OAuth, agrega las siguientes URLs de redirección:

```
exp://localhost:8081
exp://192.168.1.100:8081
```

## 5. Configurar políticas de seguridad

### 5.1 Políticas para la tabla players

Las políticas ya están incluidas en el SQL anterior, pero puedes ajustarlas según tus necesidades:

```sql
-- Ejemplo: Permitir que cualquier usuario vea los puntajes
CREATE POLICY "Public read access" ON players
  FOR SELECT USING (true);

-- Ejemplo: Permitir que los usuarios actualicen solo sus propios puntajes
CREATE POLICY "Users can update own scores" ON players
  FOR UPDATE USING (auth.uid() = user_id);
```

## 6. Probar la configuración

1. Ejecuta la aplicación: `npm start`
2. Intenta registrarte con email/contraseña
3. Intenta iniciar sesión con OAuth
4. Juega al Hangman y verifica que los puntajes se guarden
5. Verifica que el scoreboard se actualice en tiempo real

## 7. Solución de problemas

### Error de conexión a Supabase

- Verifica que las variables de entorno estén correctamente configuradas
- Asegúrate de que la URL y anon key sean correctas

### Error de autenticación OAuth

- Verifica que las URLs de redirección estén configuradas correctamente
- Asegúrate de que los Client IDs y Secrets sean válidos

### Error de permisos en la base de datos

- Verifica que las políticas RLS estén configuradas correctamente
- Asegúrate de que la tabla tenga los permisos adecuados

## 8. Estructura de la base de datos

### Tabla: players

- `id`: Identificador único (SERIAL PRIMARY KEY)
- `name`: Nombre del jugador (VARCHAR, UNIQUE)
- `score`: Puntaje del jugador (INTEGER)
- `user_id`: ID del usuario autenticado (UUID, opcional)
- `created_at`: Fecha de creación (TIMESTAMP)
- `updated_at`: Fecha de última actualización (TIMESTAMP)

## 9. Funcionalidades implementadas

- ✅ Registro y login con email/contraseña
- ✅ Autenticación OAuth (Google, GitHub, Discord)
- ✅ Gestión de sesión de usuario
- ✅ Scoreboard en tiempo real
- ✅ Protección de rutas
- ✅ Botón de logout en Home
- ✅ Integración con el juego Hangman
