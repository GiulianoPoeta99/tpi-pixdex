# TPI-TNT - Aplicación de Hangman con Scoreboard

Aplicación React Native con Expo que incluye un juego de Hangman y un scoreboard en tiempo real usando Supabase.

## 🚀 Características

- ✅ Juego de Hangman completo
- ✅ Scoreboard en tiempo real
- ✅ Autenticación con Supabase
- ✅ OAuth (Google, GitHub, Discord)
- ✅ Verificación de email
- ✅ Actualizaciones en tiempo real

## 📋 Requisitos

- Node.js 18+
- Expo CLI
- Cuenta de Supabase

## 🛠️ Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd tpi-tnt
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
```

Editar `.env` con tus credenciales de Supabase:

```env
EXPO_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

### 4. Configurar Supabase

#### Crear proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Crea un nuevo proyecto
3. Anota la URL y anon key

#### Ejecutar migración

1. Ve al **SQL Editor** de Supabase
2. Ejecuta el archivo `migrations/001_initial_schema.sql`
3. Verifica que todas las verificaciones finales sean exitosas

#### Configurar autenticación

1. En **Authentication > Providers**, habilita los que necesites
2. Agrega URLs de redirección:

   ```txt
   exp://localhost:8081
   exp://192.168.1.100:8081
   ```

#### Habilitar Realtime

1. Ve a **Database > Tables > players**
2. En la pestaña **Realtime**, activa el toggle

### 5. Ejecutar la aplicación

```bash
expo start
```

## 🎮 Uso

1. **Registrarse/Iniciar sesión** con email o OAuth
2. **Verificar email** (requerido para jugar)
3. **Ir al Hangman** desde el menú principal
4. **Ingresar nombre de jugador** y comenzar a jugar
5. **Ver scoreboard** que se actualiza en tiempo real

## 📊 Estructura de la base de datos

### Tabla `players`

| Columna    | Tipo                | Descripción           |
|------------|---------------------|----------------------|
| id         | SERIAL PRIMARY KEY  | ID único              |
| name       | VARCHAR(255) UNIQUE | Nombre del jugador    |
| score      | INTEGER DEFAULT 0   | Puntaje               |
| user_id    | UUID                | ID del usuario        |
| created_at | TIMESTAMP           | Fecha de creación     |
| updated_at | TIMESTAMP           | Fecha de actualización|

## 🔧 Solución de problemas

### Scoreboard no muestra todos los jugadores

- Verifica que las políticas RLS estén configuradas correctamente
- Ejecuta nuevamente la migración si es necesario
- Limpia la cache de la aplicación: `expo start --clear`

### Error de autenticación

- Verifica las credenciales en `.env`
- Confirma que las URLs de redirección estén configuradas
- Revisa que el email esté verificado

### Realtime no funciona

- Verifica que Realtime esté habilitado en la tabla `players`
- Confirma que las políticas permitan lectura

## 📁 Estructura del proyecto

```tree
src/
├── hang-man/          # Juego de Hangman
├── shared/            # Componentes y servicios compartidos
│   ├── components/    # Componentes reutilizables
│   ├── context/       # Contextos de React
│   ├── services/      # Servicios de API
│   └── config/        # Configuración
└── home/              # Pantalla principal

migrations/
└── 001_initial_schema.sql  # Migración inicial de Supabase
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
