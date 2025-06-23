import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { ROUTES } from "@/src/shared/navigation/routes";
import { Colors } from "@/src/shared/constants/Colors";
import { GameButton } from "./GameButton";

/**
 * Componente contenedor de botones de juegos para la pantalla principal.
 * Muestra los accesos directos a los juegos disponibles.
 *
 * @component
 * @returns {JSX.Element} Contenedor con los botones de juegos.
 *
 * @example
 * <GameButtonsContainer />
 */
export const GameButtonsContainer: React.FC = () => {
  return (
    <View style={styles.container}>
      <GameButton
        title="Desafío del Ahorcado"
        description="Adivina los títulos letra por letra. ¿Cuántos puedes identificar?"
        buttonColor={{ backgroundColor: Colors.purpura }}
        url={ROUTES.HANG_MAN}
      />
      <GameButton
        title="Pixel Reveal"
        description="Identifica títulos desde imágenes pixeladas. ¡Pon a prueba tu memoria visual!"
        buttonColor={[{ backgroundColor: Colors.verde }]}
        url={ROUTES.PIXEL_REVEAL}
      />
    </View>
  );
};

/**
 * Estilos para el componente GameButtonsContainer.
 * @private
 */
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    gap: Platform.OS === "web" ? 20 : 14,
  },
});
