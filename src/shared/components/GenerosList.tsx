import React from "react";
import { StyleSheet, View } from "react-native";
import { IGeneroContenidoAudiovisual, generosContenidoAudiovisual } from "../data/generosContenidoAudiovisual";
import { Tag } from "./Tag";

interface GenerosListProps {
    generoIds?: number[];
    generoNombres?: string[];
}

export const GenerosList: React.FC<GenerosListProps> = ({ generoIds, generoNombres }) => {
    let generos: IGeneroContenidoAudiovisual[] = [];

    if (generoIds) {
        generos = generoIds
            .map(id => generosContenidoAudiovisual.find(g => g.id === id))
            .filter((genero): genero is IGeneroContenidoAudiovisual => genero !== undefined);
    } else if (generoNombres) {
        generos = generoNombres
            .map(nombre => generosContenidoAudiovisual.find(g => g.nombre === nombre))
            .filter((genero): genero is IGeneroContenidoAudiovisual => genero !== undefined);
    }

    if (generos.length === 0) {
        return null;
    }

    return (
        <View style={styles.container}>
            {generos.map((genero, index) => (
                <Tag key={index} nombre={genero.nombre} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
}); 