import { MaterialIcons } from '@expo/vector-icons';
import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';

/**
 * Propiedades para el componente VerificationStatus.
 * @interface
 * @property {boolean} isEmailVerified - Indica si el email está verificado.
 * @property {boolean} isLoading - Indica si se está verificando el estado.
 * @property {string | null} error - Mensaje de error si ocurre alguno.
 */
interface VerificationStatusProps {
  isEmailVerified: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Componente que muestra el estado de verificación del email del usuario.
 * Se muestra en la pantalla principal para informar al usuario sobre su estado.
 *
 * @component
 * @param {VerificationStatusProps} props - Propiedades del componente.
 * @param {boolean} props.isEmailVerified - Indica si el email está verificado.
 * @param {boolean} props.isLoading - Indica si se está verificando el estado.
 * @param {string | null} props.error - Mensaje de error si ocurre alguno.
 * @returns {JSX.Element | null} Componente de estado de verificación o null si está cargando.
 *
 * @example
 * <VerificationStatus
 *   isEmailVerified={false}
 *   isLoading={false}
 *   error="Tu email no ha sido verificado"
 * />
 */
export const VerificationStatus: FC<VerificationStatusProps> = ({
  isEmailVerified,
  isLoading,
  error
}) => {
  if (isLoading) {
    return null;
  }

  if (isEmailVerified) {
    return (
      <View style={styles.verifiedContainer}>
        <MaterialIcons name="check-circle" size={20} color={Colors.verde} />
        <Text style={styles.verifiedText}>Email verificado</Text>
      </View>
    );
  }

  return (
    <View style={styles.unverifiedContainer}>
      <MaterialIcons name="warning" size={20} color={Colors.rojo} />
      <Text style={styles.unverifiedText}>
        {error || 'Email no verificado'}
      </Text>
    </View>
  );
};

/**
 * Estilos para el componente VerificationStatus.
 * @private
 */
const styles = StyleSheet.create({
  verifiedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 10,
    backgroundColor: Colors.verde + '20',
    borderWidth: 1,
    borderColor: Colors.verde,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  verifiedText: {
    color: Colors.verde,
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '600',
  },
  unverifiedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 10,
    backgroundColor: Colors.rojo + '20',
    borderWidth: 1,
    borderColor: Colors.rojo,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  unverifiedText: {
    color: Colors.rojo,
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '600',
  },
}); 