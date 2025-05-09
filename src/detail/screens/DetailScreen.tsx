import React from "react"
import { ScrollView, StyleSheet, View } from "react-native";
import { DetailHeader } from "../components/DetailHeader";
import { AudioVisualCardExtended } from "../components/AudioVisualCardExtended";
import { Colors } from "@/src/shared/constants/Colors";
import { ContenidoAudiovisualRepository } from "@/src/shared/repositories/contenidos-audiovisuales-repository";
import { TiposContenidoAudiovisual } from "@/src/shared/repositories/tipos-contenido-audiovisual-repository";

interface DetailScreenProps {
    audioVisualId: string
};

export const DetailScreen: React.FC<DetailScreenProps> = ({ audioVisualId }) => {
    const contenidoAudioVisual = ContenidoAudiovisualRepository.getOneByID(Number(audioVisualId))
    const tipo = TiposContenidoAudiovisual.getOneByID(contenidoAudioVisual.tipoId)
    const generos = ContenidoAudiovisualRepository.getAllGendersForContenidoAudiovisual(contenidoAudioVisual)

    return (
        <ScrollView style={styles.container}>
            <DetailHeader />
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