import { Colors } from "@/src/shared/constants/Colors";
import { useData } from "@/src/shared/context/DataContext";
import React from "react";
import { ScrollView, StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AudioVisualCardExtended } from "../components/AudioVisualCardExtended";
import { DetailHeader } from "../components/DetailHeader";

interface DetailScreenProps {
    audioVisualId: string
};

export const DetailScreen: React.FC<DetailScreenProps> = ({ audioVisualId }) => {
    const { 
        getContenidoById, 
        getTipoById, 
        getGenerosByIds, 
        loading, 
        errors, 
        isInitialized 
    } = useData();

    // Obtener datos del contexto
    const contenidoAudioVisual = getContenidoById(Number(audioVisualId));
    const tipo = contenidoAudioVisual ? getTipoById(contenidoAudioVisual.tipoId) : null;
    const generos = contenidoAudioVisual ? getGenerosByIds(contenidoAudioVisual.generos) : [];

    // Mostrar loading mientras se inicializa
    if (!isInitialized || loading.contenidos || loading.tipos || loading.generos) {
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
    if (errors.contenidos || errors.tipos || errors.generos) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>
                        Error: {errors.contenidos || errors.tipos || errors.generos}
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    // Mostrar error si no se encuentra el contenido
    if (!contenidoAudioVisual || !tipo) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>No se encontró el contenido</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <DetailHeader />
                <View style={styles.cardContainer}>
                    <AudioVisualCardExtended 
                        item={contenidoAudioVisual} 
                        tipo={tipo} 
                        generos={generos} 
                    />
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