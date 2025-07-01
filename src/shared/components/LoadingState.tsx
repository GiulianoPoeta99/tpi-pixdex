import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

/**
 * Propiedades para el componente LoadingState.
 * @interface
 * @property {string} [message] - Mensaje opcional a mostrar durante la carga.
 * @property {"small" | "large"} [size] - Tamaño del spinner de carga.
 * @property {string} [color] - Color del spinner y el texto.
 */
interface LoadingStateProps {
  message?: string;
  size?: 'small' | 'large';
  color?: string;
}

/**
 * Componente visual para mostrar un estado de carga con un mensaje y un spinner.
 *
 * @component
 * @param {LoadingStateProps} props - Propiedades del componente.
 * @param {string} [props.message] - Mensaje opcional a mostrar durante la carga.
 * @param {"small" | "large"} [props.size] - Tamaño del spinner de carga.
 * @param {string} [props.color] - Color del spinner y el texto.
 * @returns {JSX.Element} Indicador de carga con mensaje.
 *
 * @example
 * <LoadingState message="Cargando datos..." size="small" color="#00f" />
 */
export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Cargando...',
  size = 'large',
  color = Colors.purpura,
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      <Text style={[styles.text, { color }]}>{message}</Text>
    </View>
  );
};

/**
 * Estilos para el componente LoadingState.
 * @private
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  },
});
