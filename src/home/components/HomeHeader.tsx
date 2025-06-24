import { Button } from "@/src/shared/components/Button";
import { TextPressStart2P } from "@/src/shared/components/TextPressStart2P";
import { Colors } from "@/src/shared/constants/Colors";
import { useAuth } from "@/src/shared/context/AuthContext";
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
 * Muestra el logo, un botón para filtrar resultados y un botón de cuenta para gestionar la sesión.
 *
 * @component
 * @param {HomeHeaderProps} props - Propiedades del componente.
 * @param {() => void} props.onFilterPress - Función que se ejecuta al presionar el botón de filtro.
 * @returns {JSX.Element} El encabezado de la pantalla principal.
 *
 * @example
 * <HomeHeader onFilterPress={() => console.log('Filtrar presionado')} />
 */
export const HomeHeader: React.FC<HomeHeaderProps> = ({ onFilterPress }) => {
  const { signOut, user } = useAuth();

  /**
   * Maneja el logout del usuario.
   */
  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <View style={[styles.container, { height: HEADER_HEIGHT }]}>
      <TextPressStart2P style={styles.logo}>Pixdex</TextPressStart2P>
      <View style={styles.buttonContainer}>
        <Button onPress={onFilterPress} icon="settings" text="FILTRAR" />
        {user && (
          <Button 
            onPress={handleLogout} 
            icon="logout" 
            text="CUENTA" 
            style={styles.accountButton}
          />
        )}
      </View>
    </View>
  );
};

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
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  accountButton: {
    backgroundColor: Colors.rojo,
    borderTopColor: Colors.rojo + '80',
    borderLeftColor: Colors.rojo + '80',
    borderBottomColor: Colors.rojo + '40',
    borderRightColor: Colors.rojo + '40',
  },
});
