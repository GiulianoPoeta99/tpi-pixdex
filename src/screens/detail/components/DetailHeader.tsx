import { TextPressStart2P } from "@/src/components/TextPressStart2P";
import { Colors } from "@/src/constants/Colors";
import { ROUTES } from "@/src/navigation/routes";
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
            <TouchableOpacity onPress={handlePress} style={styles.filterButton} activeOpacity={0.7}>
                {/* TODO: Aquí tu ícono de flecha izquierda */}
                <TextPressStart2P style={styles.filterButtonText}>BACK</TextPressStart2P>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 100,
        backgroundColor: Colors.fondo,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    logo: {
        color: Colors.purpura,
        fontSize: 24,
        fontWeight: "bold",
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
        padding: 5
    },
});
