import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";

interface LoadingStateProps {
  message?: string;
  size?: "small" | "large";
  color?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Cargando...",
  size = "large",
  color = Colors.purpura,
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      <Text style={[styles.text, { color }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  },
});
