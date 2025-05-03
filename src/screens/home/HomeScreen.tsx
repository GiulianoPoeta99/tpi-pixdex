import { Colors } from "@/src/constants/Colors";
import { StyleSheet, View } from "react-native";
import { HomeHeader } from "./components/HomeHeader";
import { GameButton } from "./components/GameButton";
import { ROUTES } from "@/src/navigation/routes";

export const HomeScreen = () => {
    return (
        <View style={styles.screenContainer}>
            <HomeHeader />
            <View style={styles.buttonRow}>
                <GameButton
                    title="Desafío del Ahorcado"
                    description="Adivina los títulos letra por letra. ¿Cuántos puedes identificar?"
                    buttonColor={[{ backgroundColor: Colors.purpura, marginRight: 12 }]}
                    url={ROUTES.HANG_MAN}
                />
                <GameButton
                    title="Pixel Reveal"
                    description="Identifica títulos desde imágenes pixeladas. ¡Pon a prueba tu memrio visual!"
                    buttonColor={[{ backgroundColor: Colors.verde }]}
                    url={ROUTES.PIXEL_REVEAL}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: { flex: 1, backgroundColor: Colors.fondo },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop: 20,
      },
});