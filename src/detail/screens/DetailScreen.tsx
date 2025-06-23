import { Colors } from "@/src/shared/constants/Colors";
import { useData } from "@/src/shared/context/DataContext";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AudioVisualCardExtended } from "../components/AudioVisualCardExtended";
import { DetailHeader } from "../components/DetailHeader";

/**
 * Propiedades para el componente DetailScreen.
 * @interface
 * @property {string} audioVisualId - ID del contenido audiovisual a mostrar en detalle.
 */
interface DetailScreenProps {
  audioVisualId: string;
}

/**
 * Pantalla de detalle para un contenido audiovisual.
 * Muestra información extendida del contenido seleccionado, incluyendo imagen, título, tipo y géneros.
 *
 * @component
 * @param {DetailScreenProps} props - Propiedades del componente.
 * @param {string} props.audioVisualId - ID del contenido audiovisual a mostrar.
 * @returns {JSX.Element} Pantalla de detalle del contenido audiovisual.
 *
 * @example
 * <DetailScreen audioVisualId="1" />
 */
export const DetailScreen: React.FC<DetailScreenProps> = ({
  audioVisualId,
}) => {
  const { getContenidoById, getTipoById, loading, errors, isInitialized } =
    useData();

  const contenidoAudioVisual = getContenidoById(Number(audioVisualId));
  const tipo = contenidoAudioVisual
    ? getTipoById(contenidoAudioVisual.tipoId)
    : null;

  if (!isInitialized || loading.contenidos || loading.tipos) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.purpura} />
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (errors.contenidos || errors.tipos) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Error: {errors.contenidos || errors.tipos}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!contenidoAudioVisual || !tipo) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No se encontró el contenido</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <DetailHeader />
        <View style={styles.cardContainer}>
          <AudioVisualCardExtended item={contenidoAudioVisual} tipo={tipo} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Estilos para la pantalla DetailScreen.
 * @private
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fondo,
  },
  scrollView: {
    flex: 1,
  },
  cardContainer: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.purpura,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});
