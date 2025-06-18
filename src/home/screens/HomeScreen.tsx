import { Colors } from "@/src/shared/constants/Colors";
import { tiposContenidoAudiovisual } from "@/src/shared/data/tiposContenidoAudiovisual";
import { ROUTES } from "@/src/shared/navigation/routes";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AudioVisualList } from "../components/AudioVisualList";
import { GameButton } from "../components/GameButton";
import { HomeHeader } from "../components/HomeHeader";

export const HomeScreen = () => (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
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
                {tiposContenidoAudiovisual.map(tipo => (
                    <AudioVisualList key={tipo.id} tipoId={tipo.id} />
                ))}
            </View>
        </ScrollView>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: Colors.fondo 
    },
    scrollView: {
        flex: 1,
    },
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