import { Button } from "@/src/shared/components/Button";
import { TextPressStart2P } from "@/src/shared/components/TextPressStart2P";
import { Colors } from "@/src/shared/constants/Colors";
import { Platform, StyleSheet, View } from "react-native";

const HEADER_HEIGHT = Platform.select({ ios: 100, android: 50, default: 70 });

export const HomeHeader = () => (
    <View style={[styles.container, { height: HEADER_HEIGHT }]}>
        <TextPressStart2P style={styles.logo}>Pixdex</TextPressStart2P>
        <Button
            onPress={() => {}}
            icon="settings"
            text="FILTRAR"
        />
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
});
