import { MaterialIcons } from '@expo/vector-icons';
import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { TextPressStart2P } from './TextPressStart2P';

/**
 * Propiedades para el componente EmailVerificationBanner.
 * @interface
 * @property {boolean} isEmailVerified - Indica si el email está verificado.
 * @property {boolean} isLoading - Indica si se está verificando el estado.
 * @property {string | null} error - Mensaje de error si ocurre alguno.
 */
interface EmailVerificationBannerProps {
  isEmailVerified: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Banner que muestra el estado de verificación del email del usuario.
 * Se muestra solo cuando el email no está verificado.
 *
 * @component
 * @param {EmailVerificationBannerProps} props - Propiedades del componente.
 * @param {boolean} props.isEmailVerified - Indica si el email está verificado.
 * @param {boolean} props.isLoading - Indica si se está verificando el estado.
 * @param {string | null} props.error - Mensaje de error si ocurre alguno.
 * @returns {JSX.Element | null} Banner de verificación o null si el email está verificado.
 *
 * @example
 * <EmailVerificationBanner
 *   isEmailVerified={false}
 *   isLoading={false}
 *   error="Tu email no ha sido verificado"
 * />
 */
export const EmailVerificationBanner: FC<EmailVerificationBannerProps> = ({
  isEmailVerified,
  isLoading,
  error
}) => {
  // No mostrar nada si el email está verificado o está cargando
  if (isEmailVerified || isLoading) {
    return null;
  }

  return (
    <View style={styles.banner}>
      <MaterialIcons name="warning" size={24} color={Colors.rojo} />
      <View style={styles.textContainer}>
        <TextPressStart2P style={styles.title}>
          Email No Verificado
        </TextPressStart2P>
        <Text style={styles.message}>
          {error || 'Por favor, verifica tu email antes de jugar para guardar tus puntajes.'}
        </Text>
      </View>
    </View>
  );
};

/**
 * Estilos para el componente EmailVerificationBanner.
 * @private
 */
const styles = StyleSheet.create({
  banner: {
    backgroundColor: Colors.rojo + '20',
    borderWidth: 2,
    borderColor: Colors.rojo,
    padding: 15,
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: Colors.rojo,
    marginBottom: 5,
  },
  message: {
    color: Colors.rojo,
    fontSize: 14,
    fontFamily: 'System',
    lineHeight: 20,
  },
}); 