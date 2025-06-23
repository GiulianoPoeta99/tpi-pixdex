import { Button } from "@/src/shared/components/Button";
import { Colors } from "@/src/shared/constants/Colors";
import { useRouter } from "expo-router";
import { Platform, StyleSheet, View } from "react-native";

/**
 * Altura del encabezado de la pantalla de detalle, ajustada según la plataforma.
 * @constant
 */
const HEADER_HEIGHT = Platform.select({ ios: 86, default: 56 });

/**
 * Encabezado para la pantalla de detalle.
 * Incluye un botón para volver a la pantalla anterior.
 *
 * @component
 * @returns {JSX.Element} Encabezado con botón de retroceso.
 *
 * @example
 * <DetailHeader />
 */
export const DetailHeader = () => {
  const router = useRouter();

  const handlePress = () => {
    router.back();
  };

  return (
    <View style={[styles.container, { height: HEADER_HEIGHT }]}>
      <Button onPress={handlePress} icon="arrow-back" text="BACK" />
    </View>
  );
};

/**
 * Estilos para el componente DetailHeader.
 * @private
 */
const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? 50 : 20,
    backgroundColor: Colors.fondo,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
});
