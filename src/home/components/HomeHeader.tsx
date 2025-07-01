import { Button } from "@/src/shared/components/Button";
import { TextPressStart2P } from "@/src/shared/components/TextPressStart2P";
import { Colors } from "@/src/shared/constants/Colors";
import { useAuth } from "@/src/shared/context/AuthContext";
import { useEmailVerification } from "@/src/shared/hooks/useEmailVerification";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { LogoutConfirmModal } from "./LogoutConfirmModal";

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
  const { isEmailVerified, isLoading } = useEmailVerification();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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

  /**
   * Abre el modal de confirmación de logout.
   */
  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };

  /**
   * Cierra el modal de confirmación de logout.
   */
  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <View style={[styles.container, { height: HEADER_HEIGHT }]}>
        <View style={styles.logoContainer}>
          <TextPressStart2P style={styles.logo}>Pixdex</TextPressStart2P>
          {user && !isLoading && (
            <MaterialIcons
              name={isEmailVerified ? "check-circle" : "cancel"}
              size={16}
              color={isEmailVerified ? Colors.verde : Colors.rojo}
              style={styles.verificationIcon}
            />
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={onFilterPress} icon="settings" text="FILTRAR" />
          {user && (
            <Button 
              onPress={openLogoutModal} 
              icon="logout" 
              text="CUENTA" 
              style={styles.accountButton}
            />
          )}
        </View>
      </View>
      
      <LogoutConfirmModal
        visible={showLogoutModal}
        onClose={closeLogoutModal}
        onConfirm={handleLogout}
      />
    </>
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
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logo: {
    color: Colors.purpura,
    fontSize: Platform.OS === "web" ? 24 : 14,
  },
  verificationIcon: {
    marginTop: 2,
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
