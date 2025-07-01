# Configuración de Supabase para TPI-TNT (actualizado)

Este documento detalla cómo configurar Supabase para el proyecto TPI-TNT con autenticación y funcionalidades en tiempo real, sin usar la opción de Warehouse Replication (Early Access).

---

### 1. Crear proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com) y crea cuenta o inicia sesión.
2. Crea un nuevo proyecto.
3. Anota la **URL del proyecto** y la **anon key**.

---

### 2. Configurar variables de entorno

1. Copia `.env.example` a `.env`.
2. Reemplaza con tus credenciales:

```env
EXPO_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

---

### 3. Configurar la base de datos

#### 3.1 Crear la tabla `players`

En el SQL Editor de Supabase, ejecuta:

```sql
-- Tabla de jugadores
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

-- Habilitar RLS y políticas de seguridad
ALTER TABLE players ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura para usuarios autenticados" ON players
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Inserción para usuarios autenticados" ON players
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Actualización para usuarios autenticados" ON players
  FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Eliminación solo por dueño" ON players
  FOR DELETE USING (auth.uid() = user_id);
```

#### 3.2 Habilitar Realtime sobre `players`

1. En Supabase Studio, ve a **Database > Tables > players > Realtime** (o pestaña "Replication/Realtime").
2. Activa el toggle **Enable Realtime**.
3. Supabase creará internamente la publicación y permitirá el streaming de cambios.

---

### 4. Configurar autenticación

#### 4.1 Proveedores OAuth

1. En **Authentication > Providers**, habilita los que necesites:
   - Google (Client ID y Secret)
   - GitHub (Client ID y Secret)
   - Discord (Client ID y Secret)

#### 4.2 URLs de redirección

Agrega para cada proveedor:

```
exp://localhost:8081
exp://192.168.1.100:8081
```

---

### 5. Conectar desde React Native

En tu código, suscríbete a los cambios:

```js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
);

// Suscripción al canal Realtime
const channel = supabase
  .channel('players-realtime')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'players' },
    payload => {
      console.log('Cambio:', payload);
      // Actualizá estado en tu app
    }
  )
  .subscribe();

// Al desmontar componente:
supabase.removeChannel(channel);
```

También podés crear un hook para manejar estado y eventos de forma ordenada.

---

### 6. Probar la configuración

1. Ejecuta `npm start` o `expo start`.
2. Regístrate con email/contraseña.
3. Inicia sesión con OAuth.
4. Juega al Hangman y comprueba que los puntajes se guarden.
5. Verifica que el scoreboard actualice en tiempo real sin recargar.

---

### 7. Solución de problemas

- **Conexión**: revisá URL y anon key en `.env`.
- **Autenticación OAuth**: validá Client ID/Secret y URLs de redirección.
- **Permisos DB**: asegúrate de que RLS y políticas estén activas.
- **Realtime**: comprueba que esté habilitado en la pestaña Realtime de `players`.

---

### 8. Estructura resumida de `players`

| Columna    | Tipo                                   | Descripción                   |
| ---------- | -------------------------------------- | ----------------------------- |
| id         | SERIAL PRIMARY KEY                     | Identificador único           |
| name       | VARCHAR(255) UNIQUE                    | Nombre de jugador             |
| score      | INTEGER DEFAULT 0                      | Puntaje                       |
| user_id    | UUID REFERENCES auth.users(id)         | Relación con usuario          |
| created_at | TIMESTAMP WITH TIME ZONE DEFAULT NOW() | Fecha de creación             |
| updated_at | TIMESTAMP WITH TIME ZONE DEFAULT NOW() | Fecha de última actualización |

---

### 9. Funcionalidades implementadas

- ✅ Registro y login email/contraseña
- ✅ Autenticación OAuth (Google, GitHub, Discord)
- ✅ Streams Realtime de cambios en `players`
- ✅ Scoreboard que se actualiza al instante
- ✅ Protección de rutas con RLS
- ✅ Botón de logout en Home
- ✅ Integración con el juego Hangman

---

Así evitás usar la sección de Warehouse Replication y mantenés el flujo de datos en tiempo real gratis con Supabase.
