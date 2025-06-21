import { Colors } from "@/src/shared/constants/Colors";
import { useData } from "@/src/shared/context/DataContext";
import { LoadingState } from "@/src/shared/components/LoadingState";
import { ErrorState } from "@/src/shared/components/ErrorState";
import React, { useState } from 'react';
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FilterModal } from '../components/FilterModal';
import { HomeContent } from '../components/HomeContent';

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
                <LoadingState message="Cargando..." />
            </SafeAreaView>
        );
    }

    // Mostrar error si hay problemas
    if (errors.tipos || errors.generos) {
        return (
            <SafeAreaView style={styles.container}>
                <ErrorState 
                    message="Error:" 
                    error={errors.tipos || errors.generos} 
                />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <HomeContent 
                onFilterPress={() => setModalVisible(true)}
                contentTypes={filteredContentTypes}
                genreFilters={filters.genres}
            />
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
});