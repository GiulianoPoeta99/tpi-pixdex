import { TextPressStart2P } from "@/src/shared/components/TextPressStart2P";
import { Colors } from "@/src/shared/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Platform,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

/**
 * Propiedades para el componente Button.
 * @interface
 * @property {() => void} onPress - Función que se ejecuta al presionar el botón.
 * @property {keyof typeof MaterialIcons.glyphMap} [icon] - Nombre del ícono a mostrar en el botón.
 * @property {string} text - Texto a mostrar en el botón.
 * @property {StyleProp<ViewStyle>} [style] - Estilo personalizado para el botón.
 * @property {StyleProp<TextStyle>} [textStyle] - Estilo personalizado para el texto.
 * @property {boolean} [disabled] - Indica si el botón está deshabilitado.
 */
interface ButtonProps {
  onPress: () => void;
  icon?: keyof typeof MaterialIcons.glyphMap;
  text: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

/**
 * Botón personalizado reutilizable con soporte para íconos y estilos.
 *
 * @component
 * @param {ButtonProps} props - Propiedades del componente.
 * @param {() => void} props.onPress - Función que se ejecuta al presionar el botón.
 * @param {keyof typeof MaterialIcons.glyphMap} [props.icon] - Nombre del ícono a mostrar.
 * @param {string} props.text - Texto a mostrar en el botón.
 * @param {StyleProp<ViewStyle>} [props.style] - Estilo personalizado para el botón.
 * @param {StyleProp<TextStyle>} [props.textStyle] - Estilo personalizado para el texto.
 * @param {boolean} [props.disabled] - Indica si el botón está deshabilitado.
 * @returns {JSX.Element} Botón personalizado.
 *
 * @example
 * <Button onPress={() => {}} icon="check" text="Aceptar" />
 */
export const Button: React.FC<ButtonProps> = ({
  onPress,
  icon,
  text,
  style,
  textStyle,
  disabled,
}) => (
  <TouchableOpacity
    style={[styles.button, style, disabled && styles.disabled]}
    onPress={onPress}
    activeOpacity={0.7}
    disabled={disabled}
  >
    <View style={styles.content}>
      {icon && (
        <MaterialIcons
          name={icon}
          color="#FFF"
          size={Platform.OS === "web" ? 15 : 10}
          style={styles.icon}
        />
      )}
      <TextPressStart2P style={[styles.buttonText, textStyle]}>
        {text}
      </TextPressStart2P>
    </View>
  </TouchableOpacity>
);

/**
 * Estilos para el componente Button.
 * @private
 */
const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    backgroundColor: Colors.purpura,
    borderTopColor: Colors.purpuraClaro,
    borderLeftColor: Colors.purpuraClaro,
    borderBottomColor: Colors.purpuraOscuro,
    borderRightColor: Colors.purpuraOscuro,
    paddingVertical: 8,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  disabled: {
    backgroundColor: Colors.grisOscuro,
    borderTopColor: Colors.gris,
    borderLeftColor: Colors.gris,
    borderBottomColor: Colors.gris,
    borderRightColor: Colors.gris,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: 8,
  },
  buttonText: {
    color: "#FFF",
    fontSize: Platform.OS === "web" ? 15 : 8,
  },
});
