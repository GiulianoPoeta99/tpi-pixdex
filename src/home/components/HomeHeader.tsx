import { TextPressStart2P } from "@/src/shared/components/TextPressStart2P";
import { Colors } from "@/src/shared/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";

const HEADER_HEIGHT = Platform.select({ ios: 100, android: 50, default: 70 });

export const HomeHeader = () => (
    <View style={[styles.container, { height: HEADER_HEIGHT }]}>
        <TextPressStart2P style={styles.logo}>Pixdex</TextPressStart2P>
        <TouchableOpacity style={styles.filterButton} activeOpacity={0.7}>
            <TextPressStart2P style={styles.filterButtonText}>
                <MaterialIcons
                    name="settings"
                    color="#FFF"
                    size={Platform.OS === "web" ? 15 : 8}
                /> FILTRAR
            </TextPressStart2P>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === "ios" ? 50 : 20,
        backgroundColor: Colors.fondo,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    logo: {
        color: Colors.purpura,
        fontSize: Platform.OS === "web" ? 24 : 14,
        // fontWeight: "bold", // esto no funciona en android
    },
    filterButton: {
        borderWidth: 1,
        backgroundColor: Colors.purpura,
        borderTopColor: Colors.purpuraClaro,
        borderLeftColor: Colors.purpuraClaro,
        borderBottomColor: Colors.purpuraOscuro,
        borderRightColor: Colors.purpuraOscuro,
        padding: 5,
    },
    filterButtonText: {
        color: "#FFF",
        paddingHorizontal: 5,
        paddingTop: Platform.OS === "web" ? 0 : 5,
        fontSize: Platform.OS === "web" ? 15 : 8,
    },
});
