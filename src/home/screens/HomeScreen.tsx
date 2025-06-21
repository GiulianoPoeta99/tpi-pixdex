import { Colors } from "@/src/shared/constants/Colors";
import { ROUTES } from "@/src/shared/navigation/routes";
import { useData } from "@/src/shared/context/DataContext";
import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet, View, ActivityIndicator, Text } from "react-native";
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
    const { tipos, generos, loading, errors, isInitialized } = useData();
    const [modalVisible, setModalVisible] = useState(false);
    const [filters, setFilters] = useState<Filters>({
        types: [],
        genres: [],
    });

    // Inicializar filtros cuando los tipos estén disponibles
    React.useEffect(() => {
        if (tipos.length > 0 && filters.types.length === 0) {
            setFilters(prev => ({
                ...prev,
                types: tipos.map(t => t.id)
            }));
        }
    }, [tipos, filters.types.length]);

    const handleApplyFilters = (newFilters: Filters) => {
        setFilters(newFilters);
    };

    const filteredContentTypes = tipos.filter(tipo =>
        filters.types.includes(tipo.id)
    );

    // Mostrar loading mientras se inicializa
    if (!isInitialized || loading.tipos || loading.generos) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={Colors.purpura} />
                    <Text style={styles.loadingText}>Cargando...</Text>
                </View>
            </SafeAreaView>
        );
    }

    // Mostrar error si hay problemas
    if (errors.tipos || errors.generos) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>
                        Error: {errors.tipos || errors.generos}
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

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
                contentTypes={tipos}
                genres={generos}
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
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: Colors.purpura,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    }
});