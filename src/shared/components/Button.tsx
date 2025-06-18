import { TextPressStart2P } from "@/src/shared/components/TextPressStart2P";
import { Colors } from "@/src/shared/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";

interface ButtonProps {
    onPress: () => void;
    icon: keyof typeof MaterialIcons.glyphMap;
    text: string;
}

export const Button: React.FC<ButtonProps> = ({ onPress, icon, text }) => (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
        <TextPressStart2P style={styles.buttonText}>
            <MaterialIcons
                name={icon}
                color="#FFF"
                size={Platform.OS === "web" ? 15 : 8}
            /> {text}
        </TextPressStart2P>
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
        padding: 5,
    },
    buttonText: {
        color: "#FFF",
        paddingHorizontal: 5,
        paddingTop: Platform.OS === "web" ? 0 : 5,
        fontSize: Platform.OS === "web" ? 15 : 8,
    },
}); 