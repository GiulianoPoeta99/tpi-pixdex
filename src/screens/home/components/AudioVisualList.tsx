import { TextPressStart2P } from "@/src/components/TextPressStart2P";
import { Colors } from "@/src/constants/Colors";
import React, { useState } from 'react';
import { Platform, FlatList, StyleSheet, View } from "react-native";
import { tiposContenidoAudiovisual } from '@/src/data/tiposContenidoAudiovisual';
import { contenidosAudiovisuales } from '@/src/data/contenidosAudiovisuales';
import { AudioVisualCard } from "./AudioVisualCard";

interface AudioVisualListProps {
    tipoId: number;
}

export const AudioVisualList: React.FC<AudioVisualListProps> = ({ tipoId }) => {
    const tipo = tiposContenidoAudiovisual.find(t => t.id === tipoId);
    if (!tipo) return null;

    const data = contenidosAudiovisuales.filter(item => item.tipoId === tipoId);
    const [maxCardHeight, setMaxCardHeight] = useState(0);

    const handleMeasure = (height: number) => {
        if (height > maxCardHeight) setMaxCardHeight(height);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TextPressStart2P style={styles.header}>
                    {tipo.plural.toUpperCase()}
                </TextPressStart2P>
            </View>
            <FlatList
                data={data}
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
