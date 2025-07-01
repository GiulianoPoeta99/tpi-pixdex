import { TextPressStart2P } from "@/src/shared/components/TextPressStart2P";
import { ITopPlayer } from "@/src/shared/config/supabase";
import { Colors } from "@/src/shared/constants/Colors";
import React, { FC, useMemo } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

/**
 * Propiedades para el componente Scoreboard.
 * @interface
 * @property {ITopPlayer[]} players - Lista de jugadores con sus puntajes.
 * @property {boolean} loading - Indica si los datos están cargando.
 * @property {string | null} error - Mensaje de error si ocurre alguno.
 */
interface ScoreboardProps {
  players: ITopPlayer[];
  loading: boolean;
  error: string | null;
}

/**
 * Tabla de posiciones (scoreboard) que muestra los mejores puntajes de los jugadores.
 * Ordena los jugadores por puntaje y muestra los cinco primeros.
 * Actualizado para usar Supabase con funcionalidades de tiempo real.
 *
 * @component
 * @param {ScoreboardProps} props - Propiedades del componente.
 * @param {ITopPlayer[]} props.players - Lista de jugadores con sus puntajes.
 * @param {boolean} props.loading - Indica si los datos están cargando.
 * @param {string | null} props.error - Mensaje de error si ocurre alguno.
 * @returns {JSX.Element} Scoreboard de los mejores jugadores.
 *
 * @example
 * <Scoreboard players={jugadores} loading={false} error={null} />
 */
export const Scoreboard: FC<ScoreboardProps> = ({
  players,
  loading,
  error,
}) => {
  const sortedPlayers = useMemo(() => {
    return [...players].sort((a, b) => b.score - a.score);
  }, [players]);

  // Mostrar loading solo si no hay datos y está cargando
  const showLoading = loading && players.length === 0;
  
  // Mostrar error solo si no hay datos y hay error
  const showError = error && players.length === 0;

  return (
    <View style={styles.scoreboardContainer}>
      <TextPressStart2P style={styles.topPlayersTitle}>
        Top Players
      </TextPressStart2P>
      
      {showLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.purpura} />
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      ) : showError ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      ) : (
        <View style={styles.scoreboard}>
          {sortedPlayers.slice(0, 5).map((player, index) => (
            <View key={player.id} style={styles.scoreRow}>
              <Text style={styles.scoreText}>
                {index + 1}. {player.name}
              </Text>
              <TextPressStart2P style={styles.scoreValue}>
                {player.score}
              </TextPressStart2P>
            </View>
          ))}
          {sortedPlayers.length === 0 && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No hay jugadores aún</Text>
              <Text style={styles.emptySubtext}>¡Sé el primero en jugar!</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

/**
 * Estilos para el componente Scoreboard.
 * @private
 */
const styles = StyleSheet.create({
  scoreboardContainer: { width: "100%", marginTop: 40 },
  topPlayersTitle: {
    fontSize: 22,
    color: Colors.verde,
    textAlign: "center",
    marginBottom: 20,
  },
  scoreboard: {
    borderWidth: 2,
    borderColor: Colors.gris,
    padding: 20,
    backgroundColor: Colors.grisOscuro,
  },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 10,
  },
  scoreText: { color: "#FFF", fontSize: 18, fontFamily: "System" },
  scoreValue: { color: Colors.verde, fontSize: 15 },
  loadingContainer: {
    borderWidth: 2,
    borderColor: Colors.gris,
    padding: 20,
    backgroundColor: Colors.grisOscuro,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 100,
  },
  loadingText: {
    color: Colors.purpura,
    fontSize: 16,
    marginTop: 10,
  },
  errorContainer: {
    borderWidth: 2,
    borderColor: Colors.rojo,
    padding: 20,
    backgroundColor: Colors.grisOscuro,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 100,
  },
  errorText: {
    color: Colors.rojo,
    fontSize: 16,
    textAlign: "center",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  emptyText: {
    color: Colors.gris,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 5,
  },
  emptySubtext: {
    color: Colors.gris + '80',
    fontSize: 14,
    textAlign: "center",
  },
});
