import { Button } from "@/src/shared/components/Button";
import { Colors } from "@/src/shared/constants/Colors";
import { useRouter } from "expo-router";
import { Platform, StyleSheet, View } from "react-native";

const HEADER_HEIGHT = Platform.select({ ios: 86, default: 56 });

export const DetailHeader = () => {
    const router = useRouter();

    const handlePress = () => {
        router.back();
    };

    return (
        <View style={[styles.container, { height: HEADER_HEIGHT }]}>
            <Button
                onPress={handlePress}
                icon="arrow-back"
                text="BACK"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === "ios" ? 50 : 20,
        backgroundColor: Colors.fondo,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
});
