import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * Hook personalizado para verificar el estado de verificación del email del usuario.
 * @returns {object} Estado de verificación del email.
 * @property {boolean} isEmailVerified - Indica si el email está verificado.
 * @property {boolean} isLoading - Indica si se está verificando el estado.
 * @property {string | null} error - Mensaje de error si ocurre alguno.
 *
 * @example
 * const { isEmailVerified, isLoading, error } = useEmailVerification();
 */
export const useEmailVerification = () => {
  const { user } = useAuth();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setIsEmailVerified(false);
      setIsLoading(false);
      setError(null);
      return;
    }

    // Verificar si el email está confirmado
    const checkEmailVerification = () => {
      try {
        // Para usuarios de OAuth (Google, GitHub, etc.), considerar como verificados
        if (
          user.app_metadata?.provider &&
          user.app_metadata.provider !== 'email'
        ) {
          setIsEmailVerified(true);
          setError(null);
          return;
        }

        // Para usuarios registrados con email/contraseña
        if (user.email) {
          // Si el usuario tiene email_confirmed_at, está verificado
          if (user.email_confirmed_at) {
            setIsEmailVerified(true);
            setError(null);
          } else {
            setIsEmailVerified(false);
            setError(
              'Tu email no ha sido verificado. Por favor, verifica tu email antes de jugar.'
            );
          }
        } else {
          // Si no tiene email, considerar como no verificado
          setIsEmailVerified(false);
          setError(
            'No se pudo verificar tu email. Por favor, contacta soporte.'
          );
        }
      } catch (err) {
        setError('Error al verificar el estado del email');
        console.error('Error checking email verification:', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkEmailVerification();
  }, [user]);

  return {
    isEmailVerified,
    isLoading,
    error,
  };
};
