import { TextPressStart2P } from "@/src/shared/components/TextPressStart2P";
import { Colors } from "@/src/shared/constants/Colors";
import { ROUTES } from "@/src/shared/navigation/routes";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";

export const DetailHeader = () => {
    const router = useRouter();

    const handlePress = () => {
        router.push(ROUTES.HOME);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handlePress} style={styles.backButton} activeOpacity={0.7}>
                <TextPressStart2P style={styles.backButtonText}>
                    <MaterialIcons name="arrow-back" color="#FFF" size={Platform.OS === "web" ? 15 : 8}/> BACK
                </TextPressStart2P>
            </TouchableOpacity>
        </View>
    );
};

let height = 56
if (Platform.OS === "ios") {
    height = 76
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === "ios" ? 45 : 20,
        height: height,
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
