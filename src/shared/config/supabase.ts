import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

/**
 * Configuración de Supabase para la aplicación.
 * @constant
 */
const supabaseUrl =
  process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

/**
 * Configuración de almacenamiento para Expo
 * Usa AsyncStorage para persistir la sesión
 */
const getStorageConfig = () => {
  return {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    storage: AsyncStorage,
  };
};

/**
 * Cliente de Supabase configurado para la aplicación.
 * Incluye autenticación, base de datos y funcionalidades de tiempo real.
 * @constant
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: getStorageConfig(),
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

/**
 * Tipos de datos para el scoreboard de jugadores.
 * @interface
 */
export interface ITopPlayer {
  id: number;
  name: string;
  score: number;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Tipos de datos para el usuario autenticado.
 * @interface
 */
export interface IUser {
  id: string;
  email?: string;
  user_metadata?: {
    name?: string;
    avatar_url?: string;
    provider?: string;
  };
  created_at: string;
  updated_at: string;
}
