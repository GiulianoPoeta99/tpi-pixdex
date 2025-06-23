import { Button } from "@/src/shared/components/Button";
import { Colors } from "@/src/shared/constants/Colors";
import { IContenidoAudiovisual } from "@/database/contenidosAudiovisuales";
import React, { FC } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

/**
 * Propiedades para el componente GameArea.
 * @interface
 * @property {IContenidoAudiovisual | null} currentWord - Objeto del contenido audiovisual actual o null si no hay.
 * @property {string} displayedWord - Palabra mostrada con las letras adivinadas y ocultas.
 * @property {() => void} onGuessLetter - Función para abrir el modal de adivinar letra.
 * @property {() => void} onGuessTitle - Función para abrir el modal de adivinar título.
 */
interface GameAreaProps {
  currentWord: IContenidoAudiovisual | null;
  displayedWord: string;
  onGuessLetter: () => void;
  onGuessTitle: () => void;
}

/**
 * Área principal del juego del ahorcado.
 * Muestra la imagen, el nombre, la palabra a adivinar y los botones de acción.
 *
 * @component
 * @param {GameAreaProps} props - Propiedades del componente.
 * @param {IContenidoAudiovisual | null} props.currentWord - Contenido audiovisual actual.
 * @param {string} props.displayedWord - Palabra mostrada con letras adivinadas y ocultas.
 * @param {() => void} props.onGuessLetter - Acción para adivinar una letra.
 * @param {() => void} props.onGuessTitle - Acción para adivinar el título completo.
 * @returns {JSX.Element} Área principal del juego.
 *
 * @example
 * <GameArea
 *   currentWord={contenido}
 *   displayedWord="_ _ _ _ _"
 *   onGuessLetter={() => {}}
 *   onGuessTitle={() => {}}
 * />
 */
export const GameArea: FC<GameAreaProps> = ({
  currentWord,
  displayedWord,
  onGuessLetter,
  onGuessTitle,
}) => (
  <View style={styles.gameArea}>
    <View style={styles.gameActions}>
      <Button onPress={onGuessTitle} icon="check-circle" text="GUESS TITLE" />
      <Button onPress={onGuessLetter} icon="keyboard" text="GUESS LETTER" />
    </View>
    <View style={styles.imageContainer}>
      {currentWord && (
        <Image
          source={{ uri: currentWord.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
    </View>
    <Text style={styles.imageSubtitle}>{currentWord?.nombre}</Text>
    <View style={styles.wordContainer}>
      <Text style={styles.wordText}>{displayedWord}</Text>
    </View>
  </View>
);

/**
 * Estilos para el componente GameArea.
 * @private
 */
const styles = StyleSheet.create({
  gameArea: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderWidth: 4,
    borderColor: Colors.grisOscuro,
    margin: 20,
  },
  gameActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 20,
    marginBottom: 20,
    gap: 10,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.grisOscuro,
    overflow: "hidden",
  },
  image: { width: "100%", height: "100%" },
  imageSubtitle: {
    color: Colors.grisOscuro,
    fontSize: 12,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  wordContainer: {
    padding: 20,
    backgroundColor: Colors.grisOscuro,
    borderWidth: 0,
  },
  wordText: {
    fontSize: 32,
    color: "#FFF",
    textAlign: "center",
    letterSpacing: 8,
  },
});
