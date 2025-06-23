import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "../constants/Colors";
import { capitalize } from "../utils/text";
import { TextPressStart2P } from "./TextPressStart2P";

/**
 * Propiedades para el componente Checkbox.
 * @interface
 * @property {string} label - Etiqueta que se muestra junto al checkbox.
 * @property {boolean} checked - Indica si el checkbox está seleccionado.
 * @property {() => void} onPress - Función que se ejecuta al presionar el checkbox.
 */
interface CheckboxProps {
  label: string;
  checked: boolean;
  onPress: () => void;
}

/**
 * Componente visual de checkbox personalizado con etiqueta.
 * Permite seleccionar o deseleccionar una opción.
 *
 * @component
 * @param {CheckboxProps} props - Propiedades del componente.
 * @param {string} props.label - Etiqueta que se muestra junto al checkbox.
 * @param {boolean} props.checked - Indica si el checkbox está seleccionado.
 * @param {() => void} props.onPress - Función que se ejecuta al presionar el checkbox.
 * @returns {JSX.Element} Checkbox con etiqueta.
 *
 * @example
 * <Checkbox label="Acción" checked={true} onPress={() => {}} />
 */
export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.box, checked && styles.checkedBox]}>
        {checked && (
          <MaterialIcons name="check" size={18} color={Colors.fondo} />
        )}
      </View>
      <TextPressStart2P style={styles.label}>
        {capitalize(label)}
      </TextPressStart2P>
    </TouchableOpacity>
  );
};

/**
 * Estilos para el componente Checkbox.
 * @private
 */
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    width: Platform.OS === "web" ? 180 : 150,
  },
  box: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: Colors.purpuraClaro,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkedBox: {
    backgroundColor: Colors.purpuraClaro,
  },
  label: {
    fontSize: Platform.OS === "web" ? 11 : 9,
    color: "#FFF",
  },
});
