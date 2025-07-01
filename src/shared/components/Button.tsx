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
 * Variantes de color disponibles para el botón.
 * @enum
 */
export enum ButtonVariant {
  PURPLE = "purple",
  GREEN = "green",
  RED = "red",
  GRAY = "gray",
}

/**
 * Propiedades para el componente Button.
 * @interface
 * @property {() => void} onPress - Función que se ejecuta al presionar el botón.
 * @property {keyof typeof MaterialIcons.glyphMap} [icon] - Nombre del ícono a mostrar en el botón.
 * @property {string} text - Texto a mostrar en el botón.
 * @property {StyleProp<ViewStyle>} [style] - Estilo personalizado para el botón.
 * @property {StyleProp<TextStyle>} [textStyle] - Estilo personalizado para el texto.
 * @property {boolean} [disabled] - Indica si el botón está deshabilitado.
 * @property {ButtonVariant} [variant] - Variante de color del botón.
 */
interface ButtonProps {
  onPress: () => void;
  icon?: keyof typeof MaterialIcons.glyphMap;
  text: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  variant?: ButtonVariant;
}

/**
 * Obtiene los estilos de color para una variante específica del botón.
 * @param {ButtonVariant} variant - Variante del botón.
 * @returns {object} Objeto con los colores de fondo y bordes.
 */
const getVariantStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case ButtonVariant.GREEN:
      return {
        backgroundColor: Colors.verde,
        borderTopColor: Colors.verdeClaro,
        borderLeftColor: Colors.verdeClaro,
        borderBottomColor: Colors.verdeOscuro,
        borderRightColor: Colors.verdeOscuro,
      };
    case ButtonVariant.RED:
      return {
        backgroundColor: Colors.rojo,
        borderTopColor: Colors.rojoClaro,
        borderLeftColor: Colors.rojoClaro,
        borderBottomColor: Colors.rojoOscuro,
        borderRightColor: Colors.rojoOscuro,
      };
    case ButtonVariant.GRAY:
      return {
        backgroundColor: Colors.grisMedio,
        borderTopColor: Colors.grisClaro,
        borderLeftColor: Colors.grisClaro,
        borderBottomColor: Colors.grisOscuro,
        borderRightColor: Colors.grisOscuro,
      };
    case ButtonVariant.PURPLE:
    default:
      return {
        backgroundColor: Colors.purpura,
        borderTopColor: Colors.purpuraClaro,
        borderLeftColor: Colors.purpuraClaro,
        borderBottomColor: Colors.purpuraOscuro,
        borderRightColor: Colors.purpuraOscuro,
      };
  }
};

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
 * @param {ButtonVariant} [props.variant] - Variante de color del botón.
 * @returns {JSX.Element} Botón personalizado.
 *
 * @example
 * <Button onPress={() => {}} icon="check" text="Aceptar" variant={ButtonVariant.GREEN} />
 */
export const Button: React.FC<ButtonProps> = ({
  onPress,
  icon,
  text,
  style,
  textStyle,
  disabled,
  variant = ButtonVariant.PURPLE,
}) => {
  const variantStyles = getVariantStyles(variant);
  
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variantStyles,
        style,
        disabled && styles.disabled
      ]}
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
};

/**
 * Estilos para el componente Button.
 * @private
 */
const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
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
