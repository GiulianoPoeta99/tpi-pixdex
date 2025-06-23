import { Colors } from "@/src/shared/constants/Colors";
import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

/**
 * Propiedades para el componente ErrorState.
 * @interface
 * @property {string} message - Mensaje de error a mostrar.
 */
interface ErrorStateProps {
  message: string;
}

/**
 * Componente visual para mostrar un mensaje de error destacado.
 *
 * @component
 * @param {ErrorStateProps} props - Propiedades del componente.
 * @param {string} props.message - Mensaje de error a mostrar.
 * @returns {JSX.Element} Mensaje de error visual.
 *
 * @example
 * <ErrorState message="Ocurrió un error inesperado" />
 */
export const ErrorState: FC<ErrorStateProps> = ({ message }) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorText}>Error: {message}</Text>
  </View>
);

/**
 * Estilos para el componente ErrorState.
 * @private
 */
const styles = StyleSheet.create({
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { color: Colors.rojo, fontSize: 16, textAlign: "center" },
});
