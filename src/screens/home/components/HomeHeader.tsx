import { TextPressStart2P } from "@/src/components/TextPressStart2P";
import { Colors } from "@/src/constants/Colors";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const HomeHeader = () => {
    const { top } = useSafeAreaInsets();
    const paddingTop = Platform.OS === "ios" ? top + 20 : 20;

    return (
        <View style={[styles.container, { paddingTop }]}>
            <TextPressStart2P style={styles.logo}>Pixdex</TextPressStart2P>
            <TouchableOpacity style={styles.filterButton} activeOpacity={0.7}>
                {/* TODO: Aquí tu ícono de engranaje */}
                <TextPressStart2P style={styles.filterButtonText}>FILTRAR</TextPressStart2P>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 70,
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
