import { Colors } from "@/src/shared/constants/Colors";
import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

interface ErrorStateProps {
  message: string;
}

export const ErrorState: FC<ErrorStateProps> = ({ message }) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorText}>Error: {message}</Text>
  </View>
);

const styles = StyleSheet.create({
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { color: Colors.rojo, fontSize: 16, textAlign: "center" },
});
