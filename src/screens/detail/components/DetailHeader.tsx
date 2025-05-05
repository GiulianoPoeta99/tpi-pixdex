import { TextPressStart2P } from "@/src/components/TextPressStart2P";
import { Colors } from "@/src/constants/Colors";
import { ROUTES } from "@/src/navigation/routes";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const DetailHeader = () => {
    const { top } = useSafeAreaInsets();
    const paddingTop = Platform.OS === "ios" ? top + 20 : 20;

    const router = useRouter();

    const handlePress = () => {
        router.push(ROUTES.HOME);
    };

    return (
        <View style={[styles.container, { paddingTop }]}>
            <TouchableOpacity onPress={handlePress} style={styles.backButton} activeOpacity={0.7}>
                <TextPressStart2P style={styles.backButtonText}>
                    <MaterialIcons name="arrow-back" color="#FFF" size={Platform.OS === "web" ? 15 : 8}/> BACK
                </TextPressStart2P>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 56,
        backgroundColor: Colors.fondo,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    logo: {
        color: Colors.purpura,
        fontSize: 24,
        // fontWeight: "bold",
    },
    backButton: {
        borderWidth: 1,
        backgroundColor: Colors.purpura,
        borderTopColor: Colors.purpuraClaro,
        borderLeftColor: Colors.purpuraClaro,
        borderBottomColor: Colors.purpuraOscuro,
        borderRightColor: Colors.purpuraOscuro,
        padding: 5,
    },
    backButtonText: {
        color: "#FFF",
        paddingHorizontal: 5,
        paddingTop: Platform.OS === "web" ? 0 : 5,
        fontSize: Platform.OS === "web" ? 15 : 8,
    },
});
