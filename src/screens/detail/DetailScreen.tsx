import { ContenidoAudiovisual, contenidosAudiovisuales } from "@/src/data/contenidosAudiovisuales";
import { generosContenidoAudiovisual, IGeneroContenidoAudiovisual } from "@/src/data/generosContenidoAudiovisual";
import { ITipoContenidoAudiovisual, tiposContenidoAudiovisual } from "@/src/data/tiposContenidoAudiovisual";
import React from "react"
import { ScrollView, StyleSheet, View } from "react-native";
import { DetailHeader } from "./components/DetailHeader"
import { Colors } from "@/src/constants/Colors";
import { AudioVisualCardExtended } from "./components/AudioVisualCardExtended";

interface DetailScreenProps {
    audioVisualId: string
};

export const DetailScreen: React.FC<DetailScreenProps> = ({ audioVisualId }) => {
    const contenidoAudioVisual: ContenidoAudiovisual | undefined = contenidosAudiovisuales.find(
        (contenido) => contenido.id === Number(audioVisualId)
    );
    const tipo: ITipoContenidoAudiovisual | undefined = tiposContenidoAudiovisual.find(
        (t) => t.id === contenidoAudioVisual?.tipoId
    );
    const generos = contenidoAudioVisual?.generos
        .map(id => generosContenidoAudiovisual.find(g => g.id === id))
        .filter((g): g is IGeneroContenidoAudiovisual => g !== undefined) || [];

    return (
        <ScrollView style={styles.container}>
            <DetailHeader/>
            <View style={styles.cardContainer}>
                {tipo && contenidoAudioVisual && (
                    <AudioVisualCardExtended item={contenidoAudioVisual} tipo={tipo} generos={generos} />
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.fondo },
    cardContainer: {
        padding: 20,
    }
});