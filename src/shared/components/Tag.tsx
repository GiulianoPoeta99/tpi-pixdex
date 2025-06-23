import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";
import { capitalize } from "../utils/text";

interface TagProps {
  nombre: string;
}

export const Tag: React.FC<TagProps> = ({ nombre }) => (
  <View style={styles.genero}>
    <Text style={styles.generoText} numberOfLines={1}>
      {capitalize(nombre)}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  genero: {
    backgroundColor: Colors.grisOscuro,
    padding: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  generoText: {
    color: "#FFF",
    fontSize: Platform.OS === "web" ? 16 : 10,
  },
});
