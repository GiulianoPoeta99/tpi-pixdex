import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";
import { capitalize } from "../utils/text";

/**
 * Propiedades para el componente Tag.
 * @interface
 * @property {string} nombre - Nombre del género o etiqueta a mostrar.
 */
interface TagProps {
  nombre: string;
}

/**
 * Componente visual para mostrar una etiqueta (tag) de género o categoría.
 *
 * @component
 * @param {TagProps} props - Propiedades del componente.
 * @param {string} props.nombre - Nombre del género o etiqueta a mostrar.
 * @returns {JSX.Element} Etiqueta visual.
 *
 * @example
 * <Tag nombre="Acción" />
 */
export const Tag: React.FC<TagProps> = ({ nombre }) => (
  <View style={styles.genero}>
    <Text style={styles.generoText} numberOfLines={1}>
      {capitalize(nombre)}
    </Text>
  </View>
);

/**
 * Estilos para el componente Tag.
 * @private
 */
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
