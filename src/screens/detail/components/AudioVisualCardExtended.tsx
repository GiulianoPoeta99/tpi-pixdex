import { TextPressStart2P } from "@/src/components/TextPressStart2P"
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { ContenidoAudiovisual } from '@/src/data/contenidosAudiovisuales';
import { Colors } from "@/src/constants/Colors";
import { IGeneroContenidoAudiovisual } from "@/src/data/generosContenidoAudiovisual"
import { ITipoContenidoAudiovisual } from "@/src/data/tiposContenidoAudiovisual";


interface AudioVisualCardExtendedProps {
    item: ContenidoAudiovisual;
    tipo: ITipoContenidoAudiovisual;
    generos: IGeneroContenidoAudiovisual[];
}

function capitalize(texto: string): string {
    return texto.length === 0
        ? ""
        : texto[0].toUpperCase() + texto.slice(1).toLowerCase();
}

export const AudioVisualCardExtended: React.FC<AudioVisualCardExtendedProps> = ({ item, tipo, generos }) => {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                />
                <View style={styles.title}>
                    <TextPressStart2P style={styles.titleText} numberOfLines={1}>
                        {item.nombre}
                    </TextPressStart2P>
                </View>

                <View style={styles.generosContainer}>
                    <View style={styles.genero}>
                        <Text style={styles.generoText}>{capitalize(tipo.singular)}</Text>
                    </View>
                </View>

                <Text style={styles.descripcion}>{item.descripcion}</Text>

                <View style={styles.generoTitle}>
                    <TextPressStart2P style={styles.generoTitleText} numberOfLines={1}>
                        GENRES
                    </TextPressStart2P>
                </View>

                {generos.length > 0 && (
                    <View style={styles.generosContainer}>
                        {generos.map((g, i) => (
                            <View key={1} style={styles.genero}>
                                <Text key={i} style={styles.generoText}>
                                    {capitalize(g?.nombre ?? "—")}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </View>
    );
};

const CARD_WIDTH = Dimensions.get('window').width * 0.5;
const CARD_HEIGHT = CARD_WIDTH * 1.5;

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: Colors.grisOscuro,
        padding: 20,
        paddingTop: 40,
        flex: 1,
        alignItems: "center"
    },
    card: {
        width: CARD_WIDTH,
        borderWidth: 2,
        borderTopColor: Colors.purpuraOscuro,
        borderRightColor: Colors.purpuraOscuro,
        borderBottomColor: Colors.purpuraClaro,
        borderLeftColor: Colors.purpuraClaro
    },
    image: {
        width: '100%',
        height: CARD_HEIGHT,
        backgroundColor: '#FFF',
    },
    title: {
        padding: 15,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.purpura,
    },
    generosContainer: {
        alignSelf: 'flex-start',
        flexDirection: "row",
        paddingHorizontal: 15,
        paddingBottom: 15,
        gap: 5,
        justifyContent: "flex-start"
    },
    genero: {
        backgroundColor: Colors.grisOscuro,
        padding: 5
    },
    generoText: {
        color: '#FFF'
    },
    descripcion: {
        paddingHorizontal: 15,
        paddingBottom: 15,
        color: '#FFF',
    },
    generoTitle: {
        padding: 15,
    },
    generoTitleText: {
        fontSize: 14,
        color: Colors.verde,
    },
});
