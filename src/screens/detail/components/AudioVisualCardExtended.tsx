import { TextPressStart2P } from "@/src/components/TextPressStart2P";
import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    useWindowDimensions,
    Platform
} from 'react-native';
import { ContenidoAudiovisual } from '@/src/data/contenidosAudiovisuales';
import { Colors } from "@/src/constants/Colors";
import { IGeneroContenidoAudiovisual } from '@/src/data/generosContenidoAudiovisual';
import { ITipoContenidoAudiovisual } from '@/src/data/tiposContenidoAudiovisual';

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

export const AudioVisualCardExtended: React.FC<AudioVisualCardExtendedProps> = ({
    item,
    tipo,
    generos
}) => {
    const { width: screenWidth } = useWindowDimensions();
    const widthFactor = Platform.OS === 'web' ? 0.5 : 0.8;
    const CARD_WIDTH = screenWidth * widthFactor;
    const [imgError, setImgError] = useState(false);

    return (
        <View style={styles.container}>
            <View style={[styles.card, { width: CARD_WIDTH }]}>
                {imgError ? (
                    <View style={[styles.image, styles.placeholder]}>
                        <Text style={styles.placeholderText} numberOfLines={3}>
                            {item.nombre}
                        </Text>
                    </View>
                ) : (
                    <Image
                        source={{ uri: item.imageUrl }}
                        style={styles.image}
                        resizeMode="cover"
                        onError={() => setImgError(true)}
                    />
                )}

                <View style={styles.title}>
                    <TextPressStart2P style={styles.titleText} numberOfLines={1}>
                        {item.nombre}
                    </TextPressStart2P>
                </View>

                {/* género singular */}
                <View style={styles.generosContainer}>
                    <View style={styles.genero}>
                        <Text style={styles.generoText} numberOfLines={1}>
                            {capitalize(tipo.singular)}
                        </Text>
                    </View>
                </View>

                <Text style={styles.descripcion} numberOfLines={4}>
                    {item.descripcion}
                </Text>

                <View style={styles.generoTitle}>
                    <TextPressStart2P style={styles.generoTitleText} numberOfLines={1}>
                        GENRES
                    </TextPressStart2P>
                </View>

                {/* géneros wrap */}
                {generos.length > 0 && (
                    <View style={styles.generosContainer}>
                        {generos.map((g, i) => (
                            <View key={i} style={styles.genero}>
                                <Text style={styles.generoText} numberOfLines={1}>
                                    {capitalize(g.nombre)}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: Colors.grisOscuro,
        padding: 20,
        flex: 1,
        alignItems: 'center',
    },
    card: {
        borderWidth: 2,
        borderTopColor: Colors.purpuraOscuro,
        borderRightColor: Colors.purpuraOscuro,
        borderBottomColor: Colors.purpuraClaro,
        borderLeftColor: Colors.purpuraClaro,
    },
    image: {
        width: '100%',
        aspectRatio: 2 / 3,
        backgroundColor: '#FFF',
    },
    placeholder: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.grisOscuro,
        padding: 10,
    },
    placeholderText: {
        color: '#FFF',
        fontSize: 14,
        textAlign: 'center',
    },
    title: {
        padding: 15,
    },
    titleText: {
        fontSize: 20,
        color: Colors.purpura,
    },
    generosContainer: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 15,
        paddingBottom: 15,
    },
    genero: {
        backgroundColor: Colors.grisOscuro,
        padding: 5,
        marginRight: 5,
        marginBottom: 5,
    },
    generoText: {
        color: '#FFF',
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