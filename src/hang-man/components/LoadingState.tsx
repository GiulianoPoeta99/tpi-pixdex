import { Colors } from "@/src/shared/constants/Colors";
import React, { FC } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

/**
 * Propiedades para el componente LoadingState.
 * @interface
 * @property {string} [message] - Mensaje opcional a mostrar durante la carga.
 */
interface LoadingStateProps {
  message?: string;
}

/**
 * Componente visual para mostrar un estado de carga con un mensaje y un spinner.
 *
 * @component
 * @param {LoadingStateProps} props - Propiedades del componente.
 * @param {string} [props.message] - Mensaje opcional a mostrar durante la carga.
 * @returns {JSX.Element} Indicador de carga con mensaje.
 *
 * @example
 * <LoadingState message="Cargando datos..." />
 */
export const LoadingState: FC<LoadingStateProps> = ({
  message = "Cargando...",
}) => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={Colors.purpura} />
    <Text style={styles.loadingText}>{message}</Text>
  </View>
);

/**
 * Estilos para el componente LoadingState.
 * @private
 */
const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { color: Colors.purpura, fontSize: 18, marginTop: 10 },
});
