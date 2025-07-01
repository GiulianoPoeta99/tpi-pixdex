import { AuthError, Session, User } from '@supabase/supabase-js';
import { supabase } from '../config/supabase';

/**
 * Servicio de autenticación que maneja el registro, login, logout y OAuth con Supabase.
 * @class
 */
export class AuthService {
  /**
   * Registra un nuevo usuario con email y contraseña.
   * @param {string} email - Email del usuario.
   * @param {string} password - Contraseña del usuario.
   * @returns {Promise<{ user: User | null; error: AuthError | null }>} Usuario registrado o error.
   * @throws {Error} Si hay un error en el proceso de registro.
   * 
   * @example
   * const { user, error } = await AuthService.signUp('usuario@ejemplo.com', 'contraseña123');
   */
  static async signUp(email: string, password: string): Promise<{ user: User | null; error: AuthError | null }> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      return { user: data.user, error };
    } catch (error) {
      console.error('Error en signUp:', error);
      throw new Error('Error al registrar usuario');
    }
  }

  /**
   * Inicia sesión con email y contraseña.
   * @param {string} email - Email del usuario.
   * @param {string} password - Contraseña del usuario.
   * @returns {Promise<{ user: User | null; error: AuthError | null }>} Usuario autenticado o error.
   * @throws {Error} Si hay un error en el proceso de login.
   * 
   * @example
   * const { user, error } = await AuthService.signIn('usuario@ejemplo.com', 'contraseña123');
   */
  static async signIn(email: string, password: string): Promise<{ user: User | null; error: AuthError | null }> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      return { user: data.user, error };
    } catch (error) {
      console.error('Error en signIn:', error);
      throw new Error('Error al iniciar sesión');
    }
  }

  /**
   * Inicia sesión con proveedor OAuth (Google, GitHub, etc.).
   * @param {string} provider - Proveedor OAuth ('google', 'github', etc.).
   * @returns {Promise<{ error: AuthError | null }>} Error si ocurre alguno.
   * @throws {Error} Si hay un error en el proceso de OAuth.
   * 
   * @example
   * const { error } = await AuthService.signInWithOAuth('google');
   */
  static async signInWithOAuth(provider: 'google' | 'github' | 'discord'): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: 'exp://localhost:8081',
        },
      });

      return { error };
    } catch (error) {
      console.error('Error en signInWithOAuth:', error);
      throw new Error(`Error al iniciar sesión con ${provider}`);
    }
  }

  /**
   * Cierra la sesión del usuario actual.
   * @returns {Promise<{ error: AuthError | null }>} Error si ocurre alguno.
   * @throws {Error} Si hay un error en el proceso de logout.
   * 
   * @example
   * const { error } = await AuthService.signOut();
   */
  static async signOut(): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
      console.error('Error en signOut:', error);
      throw new Error('Error al cerrar sesión');
    }
  }

  /**
   * Obtiene la sesión actual del usuario.
   * @returns {Promise<{ session: Session | null; error: AuthError | null }>} Sesión actual o error.
   * 
   * @example
   * const { session, error } = await AuthService.getSession();
   */
  static async getSession(): Promise<{ session: Session | null; error: AuthError | null }> {
    try {
      const { data, error } = await supabase.auth.getSession();
      return { session: data.session, error };
    } catch (error) {
      console.error('Error en getSession:', error);
      return { session: null, error: error as AuthError };
    }
  }

  /**
   * Obtiene el usuario actual.
   * @returns {Promise<{ user: User | null; error: AuthError | null }>} Usuario actual o error.
   * 
   * @example
   * const { user, error } = await AuthService.getCurrentUser();
   */
  static async getCurrentUser(): Promise<{ user: User | null; error: AuthError | null }> {
    try {
      const { data, error } = await supabase.auth.getUser();
      return { user: data.user, error };
    } catch (error) {
      console.error('Error en getCurrentUser:', error);
      return { user: null, error: error as AuthError };
    }
  }

  /**
   * Escucha cambios en el estado de autenticación.
   * @param {(event: string, session: Session | null) => void} callback - Función callback para manejar cambios.
   * @returns {() => void} Función para cancelar la suscripción.
   * 
   * @example
   * const unsubscribe = AuthService.onAuthStateChange((event, session) => {
   *   console.log('Auth state changed:', event, session);
   * });
   */
  static onAuthStateChange(callback: (event: string, session: Session | null) => void): () => void {
    const { data } = supabase.auth.onAuthStateChange(callback);
    return () => {
      data.subscription.unsubscribe();
    };
  }

  /**
   * Envía un email de reset de contraseña al usuario.
   * @param {string} email - Email del usuario.
   * @returns {Promise<{ error: AuthError | null }>} Error si ocurre alguno.
   * @throws {Error} Si hay un error en el proceso de reset.
   * 
   * @example
   * const { error } = await AuthService.resetPassword('usuario@ejemplo.com');
   */
  static async resetPassword(email: string): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'exp://localhost:8081/auth/reset-password',
      });

      return { error };
    } catch (error) {
      console.error('Error en resetPassword:', error);
      throw new Error('Error al enviar email de reset de contraseña');
    }
  }
} 