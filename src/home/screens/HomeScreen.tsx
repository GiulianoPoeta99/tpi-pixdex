import { Colors } from "@/src/shared/constants/Colors";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { HomeHeader } from "./components/HomeHeader";
import { GameButton } from "./components/GameButton";
import { ROUTES } from "@/src/shared/navigation/routes";
import { AudioVisualList } from "./components/AudioVisualList";

export const HomeScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <HomeHeader />

            <View style={styles.buttonContainer}>
                <GameButton
                    title="Desafío del Ahorcado"
                    description="Adivina los títulos letra por letra. ¿Cuántos puedes identificar?"
                    buttonColor={{ backgroundColor: Colors.purpura }}
                    url={ROUTES.HANG_MAN}
                />
                <GameButton
                    title="Pixel Reveal"
                    description="Identifica títulos desde imágenes pixeladas. ¡Pon a prueba tu memrio visual!"
                    buttonColor={[{ backgroundColor: Colors.verde }]}
                    url={ROUTES.PIXEL_REVEAL}
                />
            </View>

            <View style={styles.scrollsContainer}>
                <AudioVisualList tipoId={1} />
                <AudioVisualList tipoId={2} />
                <AudioVisualList tipoId={3} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.fondo },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        gap: Platform.OS === "web" ? 20 : 14
    },
    scrollsContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 20,
        gap: 30
    }
});