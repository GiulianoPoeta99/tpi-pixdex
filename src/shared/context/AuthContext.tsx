import { Session, User } from '@supabase/supabase-js';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AuthService } from '../services/authService';

/**
 * Tipo de datos y métodos expuestos por el contexto de autenticación.
 * @interface
 * @property {User | null} user - Usuario autenticado actual.
 * @property {Session | null} session - Sesión actual del usuario.
 * @property {boolean} loading - Indica si la autenticación está cargando.
 * @property {string | null} error - Mensaje de error si ocurre alguno.
 * @property {(email: string, password: string) => Promise<void>} signUp - Registra un nuevo usuario.
 * @property {(email: string, password: string) => Promise<void>} signIn - Inicia sesión con email y contraseña.
 * @property {(provider: 'google' | 'github' | 'discord') => Promise<void>} signInWithOAuth - Inicia sesión con OAuth.
 * @property {() => Promise<void>} signOut - Cierra la sesión del usuario.
 * @property {(email: string) => Promise<void>} resetPassword - Envía email de reset de contraseña.
 */
interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithOAuth: (provider: 'google' | 'github' | 'discord') => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Propiedades para el proveedor de contexto de autenticación.
 * @interface
 * @property {ReactNode} children - Componentes hijos envueltos por el proveedor.
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Proveedor de contexto de autenticación para la aplicación.
 * Maneja el estado de autenticación del usuario y proporciona métodos para registro, login y logout.
 *
 * @component
 * @param {AuthProviderProps} props - Propiedades del proveedor.
 * @param {ReactNode} props.children - Componentes hijos envueltos por el proveedor.
 * @returns {JSX.Element} Proveedor de contexto de autenticación.
 *
 * @example
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Obtener sesión inicial
    const getInitialSession = async () => {
      try {
        const { session, error } = await AuthService.getSession();
        
        if (error) {
          console.error('Error cargando sesión:', error);
        } else {
          setSession(session);
          setUser(session?.user || null);
        }
      } catch (error) {
        console.error('Error inesperado en getInitialSession:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Suscribirse a cambios en el estado de autenticación
    const unsubscribe = AuthService.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  /**
   * Registra un nuevo usuario con email y contraseña.
   * @param {string} email - Email del usuario.
   * @param {string} password - Contraseña del usuario.
   * @returns {Promise<void>}
   * @throws {Error} Si hay un error en el proceso de registro.
   */
  const signUp = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const { user, error } = await AuthService.signUp(email, password);

      if (error) {
        setError(error.message);
        throw new Error(error.message);
      }

      if (user) {
        setUser(user);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Inicia sesión con email y contraseña.
   * @param {string} email - Email del usuario.
   * @param {string} password - Contraseña del usuario.
   * @returns {Promise<void>}
   * @throws {Error} Si hay un error en el proceso de login.
   */
  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const { user, error } = await AuthService.signIn(email, password);

      if (error) {
        setError(error.message);
        throw new Error(error.message);
      }

      if (user) {
        setUser(user);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Inicia sesión con proveedor OAuth.
   * @param {'google' | 'github' | 'discord'} provider - Proveedor OAuth.
   * @returns {Promise<void>}
   * @throws {Error} Si hay un error en el proceso de OAuth.
   */
  const signInWithOAuth = async (
    provider: 'google' | 'github' | 'discord'
  ): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await AuthService.signInWithOAuth(provider);

      if (error) {
        setError(error.message);
        throw new Error(error.message);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cierra la sesión del usuario actual.
   * @returns {Promise<void>}
   * @throws {Error} Si hay un error en el proceso de logout.
   */
  const signOut = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await AuthService.signOut();

      if (error) {
        setError(error.message);
        throw new Error(error.message);
      }

      setUser(null);
      setSession(null);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Envía un email de reset de contraseña al usuario.
   * @param {string} email - Email del usuario.
   * @returns {Promise<void>}
   * @throws {Error} Si hay un error en el proceso de reset.
   */
  const resetPassword = async (email: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await AuthService.resetPassword(email);

      if (error) {
        setError(error.message);
        throw new Error(error.message);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    error,
    signUp,
    signIn,
    signInWithOAuth,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook personalizado para usar el contexto de autenticación.
 * @returns {AuthContextType} Contexto de autenticación.
 * @throws {Error} Si se usa fuera del AuthProvider.
 *
 * @example
 * const { user, signIn, signOut } = useAuth();
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
