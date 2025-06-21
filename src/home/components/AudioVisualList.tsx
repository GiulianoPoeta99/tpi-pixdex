import { TextPressStart2P } from "@/src/shared/components/TextPressStart2P";
import { Colors } from "@/src/shared/constants/Colors";
import { useData } from "@/src/shared/context/DataContext";
import { LoadingState } from "@/src/shared/components/LoadingState";
import { ErrorState } from "@/src/shared/components/ErrorState";
import React, { useState, useMemo } from 'react';
import { FlatList, Platform, StyleSheet, View } from "react-native";
import { AudioVisualCard } from "./AudioVisualCard";

interface AudioVisualListProps {
    tipoId: number;
    genreFilters: number[];
}

export const AudioVisualList: React.FC<AudioVisualListProps> = ({ tipoId, genreFilters }) => {
    const { getTipoById, getContenidosByTipoId, loading, errors } = useData();
    const [maxCardHeight, setMaxCardHeight] = useState(0);

    // Obtener datos del contexto
    const tipo = getTipoById(tipoId);
    const contenidosAudiovisuales = getContenidosByTipoId(tipoId);

    // Filtrar por géneros si hay filtros aplicados
    const filteredContenidos = useMemo(() => {
        if (genreFilters.length === 0) {
            return contenidosAudiovisuales;
        }
        return contenidosAudiovisuales.filter(item =>
            genreFilters.every(genreId => item.generos.includes(genreId))
        );
    }, [contenidosAudiovisuales, genreFilters]);

    const handleMeasure = (height: number) => {
        if (height > maxCardHeight) setMaxCardHeight(height);
    };

    // Mostrar loading si los datos están cargando
    if (loading.contenidos || loading.tipos) {
        return (
            <View style={styles.container}>
                <LoadingState message="Cargando..." size="small" />
            </View>
        );
    }

    // Mostrar error si hay problemas
    if (errors.contenidos || errors.tipos) {
        return (
            <View style={styles.container}>
                <ErrorState 
                    message="Error:" 
                    error={errors.contenidos || errors.tipos} 
                />
            </View>
        );
    }

    // No mostrar nada si no hay datos o tipo
    if (!tipo || filteredContenidos.length === 0) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TextPressStart2P style={styles.header}>
                    {tipo.plural.toUpperCase()}
                </TextPressStart2P>
            </View>
            <FlatList
                data={filteredContenidos}
                horizontal
                keyExtractor={item => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <AudioVisualCard
                        item={item}
                        onMeasure={handleMeasure}
                        fixedHeight={maxCardHeight || undefined}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: Colors.grisOscuro,
        padding: 20,
        paddingTop: 40,
        flex: 1,
    },
    headerContainer: {
        position: 'absolute',
        top: Platform.OS === "web" ? -19 : -15,
        left: 20,
        backgroundColor: Colors.purpura,
        borderWidth: 2,
        borderColor: Colors.purpuraClaro,
        zIndex: 1,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    header: {
        fontSize: Platform.OS === "web" ? 20 : 10,
        color: '#FFF',
    },
    listContent: {
        gap: 20,
    },
});
