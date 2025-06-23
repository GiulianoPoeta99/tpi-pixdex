import { Button } from "@/src/shared/components/Button";
import { TextPressStart2P } from "@/src/shared/components/TextPressStart2P";
import { Colors } from "@/src/shared/constants/Colors";
import { Platform, StyleSheet, View } from "react-native";

/**
 * Altura del encabezado principal de la pantalla de inicio, ajustada según la plataforma.
 * @constant
 */
const HEADER_HEIGHT = Platform.select({ ios: 100, android: 50, default: 70 });

/**
 * Propiedades para el componente HomeHeader.
 * @interface
 * @property {() => void} onFilterPress - Función que se ejecuta al presionar el botón de filtro.
 */
interface HomeHeaderProps {
  onFilterPress: () => void;
}

/**
 * Componente de encabezado para la pantalla principal (Home).
 * Muestra el logo y un botón para filtrar resultados.
 *
 * @component
 * @param {HomeHeaderProps} props - Propiedades del componente.
 * @param {() => void} props.onFilterPress - Función que se ejecuta al presionar el botón de filtro.
 * @returns {JSX.Element} El encabezado de la pantalla principal.
 *
 * @example
 * <HomeHeader onFilterPress={() => console.log('Filtrar presionado')} />
 */
export const HomeHeader: React.FC<HomeHeaderProps> = ({ onFilterPress }) => (
  <View style={[styles.container, { height: HEADER_HEIGHT }]}>
    <TextPressStart2P style={styles.logo}>Pixdex</TextPressStart2P>
    <Button onPress={onFilterPress} icon="settings" text="FILTRAR" />
  </View>
);

/**
 * Estilos para el componente HomeHeader.
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
  logo: {
    color: Colors.purpura,
    fontSize: Platform.OS === "web" ? 24 : 14,
  },
});
