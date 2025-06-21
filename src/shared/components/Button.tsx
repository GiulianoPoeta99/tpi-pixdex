import { TextPressStart2P } from "@/src/shared/components/TextPressStart2P";
import { Colors } from "@/src/shared/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Platform, StyleProp, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";

interface ButtonProps {
    onPress: () => void;
    icon?: keyof typeof MaterialIcons.glyphMap;
    text: string;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ onPress, icon, text, style, textStyle, disabled }) => (
    <TouchableOpacity style={[styles.button, style, disabled && styles.disabled]} onPress={onPress} activeOpacity={0.7} disabled={disabled}>
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
        justifyContent: 'center',
    },
    disabled: {
        backgroundColor: Colors.grisOscuro,
        borderTopColor: Colors.gris,
        borderLeftColor: Colors.gris,
        borderBottomColor: Colors.gris,
        borderRightColor: Colors.gris,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginRight: 8,
    },
    buttonText: {
        color: "#FFF",
        fontSize: Platform.OS === "web" ? 15 : 8,
    },
}); 