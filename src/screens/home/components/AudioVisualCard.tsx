import { TextPressStart2P } from "@/src/components/TextPressStart2P"
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { ContenidoAudiovisual } from '@/src/data/contenidosAudiovisuales';
import { Colors } from "@/src/constants/Colors";
import { generosContenidoAudiovisual } from "@/src/data/generosContenidoAudiovisual"
import { useRouter } from "expo-router"
import { ROUTES } from "@/src/navigation/routes";


interface Props {
    item: ContenidoAudiovisual;
}

function capitalize(texto: string): string {
    return texto.length === 0
        ? ""
        : texto[0].toUpperCase() + texto.slice(1).toLowerCase();
}

export const AudioVisualCard: React.FC<Props> = ({ item }) => {
    const router = useRouter();

    const handlePress = () => {
        router.push(`${ROUTES.DETAIL}${item.id}`);
    };

    const generos = item.generos.map(id =>
        generosContenidoAudiovisual.find(g => g.id === id)
    );

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
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
        </TouchableOpacity>
    );
};

const CARD_WIDTH = Dimensions.get('window').width * 0.2;
const CARD_HEIGHT = CARD_WIDTH * 1.5;

const styles = StyleSheet.create({
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
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFF',
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
    }
});
