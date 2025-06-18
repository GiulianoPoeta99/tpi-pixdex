import { Colors } from "@/src/shared/constants/Colors";
import { tiposContenidoAudiovisual } from "@/src/shared/data/tiposContenidoAudiovisual";
import { ROUTES } from "@/src/shared/navigation/routes";
import { GenerosContenidoAudiovisualRepository } from '@/src/shared/repositories/generos-contenido-audiovisual-repository';
import React from 'react';
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AudioVisualList } from "../components/AudioVisualList";
import { FilterModal } from '../components/FilterModal';
import { GameButton } from "../components/GameButton";
import { HomeHeader } from "../components/HomeHeader";

interface Filters {
    types: number[];
    genres: number[];
}

export const HomeScreen = () => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [filters, setFilters] = React.useState<Filters>({
        types: tiposContenidoAudiovisual.map(t => t.id),
        genres: [],
    });

    const allGenres = GenerosContenidoAudiovisualRepository.getAll();

    const handleApplyFilters = (newFilters: Filters) => {
        setFilters(newFilters);
    };

    const filteredContentTypes = tiposContenidoAudiovisual.filter(tipo =>
        filters.types.includes(tipo.id)
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <HomeHeader onFilterPress={() => setModalVisible(true)} />
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
                    {filteredContentTypes.map(tipo => (
                        <AudioVisualList key={tipo.id} tipoId={tipo.id} genreFilters={filters.genres} />
                    ))}
                </View>
            </ScrollView>
            <FilterModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onApply={handleApplyFilters}
                contentTypes={tiposContenidoAudiovisual}
                genres={allGenres}
                activeFilters={filters}
            />
        </SafeAreaView>
    );
};

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