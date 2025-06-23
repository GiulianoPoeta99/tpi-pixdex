import React from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * Propiedades para el componente ErrorState.
 * @interface
 * @property {string} [message] - Mensaje principal a mostrar.
 * @property {string | null} [error] - Mensaje de error adicional o detalle.
 * @property {string} [color] - Color del texto del mensaje de error.
 */
interface ErrorStateProps {
  message?: string;
  error?: string | null;
  color?: string;
}

/**
 * Componente visual para mostrar un mensaje de error destacado.
 * Permite personalizar el mensaje, el detalle y el color del texto.
 *
 * @component
 * @param {ErrorStateProps} props - Propiedades del componente.
 * @param {string} [props.message] - Mensaje principal a mostrar.
 * @param {string | null} [props.error] - Mensaje de error adicional o detalle.
 * @param {string} [props.color] - Color del texto del mensaje de error.
 * @returns {JSX.Element} Mensaje de error visual.
 *
 * @example
 * <ErrorState message="Ocurrió un error" error="Detalle técnico" color="#f00" />
 */
export const ErrorState: React.FC<ErrorStateProps> = ({
  message = "Error:",
  error,
  color = "red",
}) => {
  const displayMessage = error ? `${message} ${error}` : message;

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color }]}>{displayMessage}</Text>
    </View>
  );
};

/**
 * Estilos para el componente ErrorState.
 * @private
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
});
