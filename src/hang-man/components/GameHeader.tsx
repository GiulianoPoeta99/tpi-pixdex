import { Button } from "@/src/shared/components/Button";
import { Colors } from "@/src/shared/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

/**
 * Propiedades para el componente GameHeader.
 * @interface
 * @property {string} player - Nombre del jugador actual.
 * @property {number} score - Puntaje actual del jugador.
 * @property {number} lives - Cantidad de vidas restantes.
 * @property {() => void} onExit - Función para salir del juego.
 */
interface GameHeaderProps {
  player: string;
  score: number;
  lives: number;
  onExit: () => void;
}

/**
 * Encabezado del juego del ahorcado.
 * Muestra el nombre del jugador, puntaje, vidas restantes y un botón para salir.
 *
 * @component
 * @param {GameHeaderProps} props - Propiedades del componente.
 * @param {string} props.player - Nombre del jugador actual.
 * @param {number} props.score - Puntaje actual del jugador.
 * @param {number} props.lives - Cantidad de vidas restantes.
 * @param {() => void} props.onExit - Función para salir del juego.
 * @returns {JSX.Element} Encabezado del juego.
 *
 * @example
 * <GameHeader player="Juan" score={10} lives={3} onExit={() => {}} />
 */
export const GameHeader: FC<GameHeaderProps> = ({
  player,
  score,
  lives,
  onExit,
}) => (
  <View style={styles.header}>
    <Button onPress={onExit} icon="exit-to-app" text="EXIT" />
    <View style={styles.livesContainer}>
      {[...Array(5)].map((_, i) => (
        <MaterialIcons
          key={i}
          name={i < lives ? "favorite" : "favorite-border"}
          size={25}
          color={Colors.purpura}
        />
      ))}
    </View>
    <View>
      <Text style={styles.playerText}>Player: {player}</Text>
      <Text style={styles.playerText}>Score: {score}</Text>
    </View>
  </View>
);

/**
 * Estilos para el componente GameHeader.
 * @private
 */
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  livesContainer: { flexDirection: "row", gap: 5 },
  playerText: { color: "#FFF", fontSize: 14, fontFamily: "System" },
});
