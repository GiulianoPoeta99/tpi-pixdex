import { TextPressStart2P } from "@/src/shared/components/TextPressStart2P";
import { Colors } from "@/src/shared/constants/Colors";
import { ITopPlayer } from "@/database/topPlayers";
import React, { FC } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

interface ScoreboardProps {
  players: ITopPlayer[];
  loading: boolean;
  error: string | null;
}

export const Scoreboard: FC<ScoreboardProps> = ({
  players,
  loading,
  error,
}) => {
  const sortedPlayers = React.useMemo(() => {
    return [...players].sort((a, b) => b.score - a.score);
  }, [players]);

  return (
    <View style={styles.scoreboardContainer}>
      <TextPressStart2P style={styles.topPlayersTitle}>
        Top Players
      </TextPressStart2P>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.purpura} />
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      ) : error ? (
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
        </View>
      )}
    </View>
  );
};

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
});
