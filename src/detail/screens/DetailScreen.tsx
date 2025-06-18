import { Colors } from "@/src/shared/constants/Colors";
import { ContenidoAudiovisualRepository } from "@/src/shared/repositories/contenidos-audiovisuales-repository";
import { TiposContenidoAudiovisual } from "@/src/shared/repositories/tipos-contenido-audiovisual-repository";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AudioVisualCardExtended } from "../components/AudioVisualCardExtended";
import { DetailHeader } from "../components/DetailHeader";

interface DetailScreenProps {
    audioVisualId: string
};

export const DetailScreen: React.FC<DetailScreenProps> = ({ audioVisualId }) => {
    const contenidoAudioVisual = ContenidoAudiovisualRepository.getOneByID(Number(audioVisualId))
    const tipo = TiposContenidoAudiovisual.getOneByID(contenidoAudioVisual.tipoId)
    const generos = ContenidoAudiovisualRepository.getAllGendersForContenidoAudiovisual(contenidoAudioVisual)

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <DetailHeader />
                <View style={styles.cardContainer}>
                    {tipo && contenidoAudioVisual && (
                        <AudioVisualCardExtended item={contenidoAudioVisual} tipo={tipo} generos={generos} />
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: Colors.fondo 
    },
    scrollView: {
        flex: 1,
    },
    cardContainer: {
        padding: 20,
    }
});