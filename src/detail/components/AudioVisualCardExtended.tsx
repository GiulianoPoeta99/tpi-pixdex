import { Tag } from "@/src/shared/components/Tag";
import { TextPressStart2P } from "@/src/shared/components/TextPressStart2P";
import { Colors } from "@/src/shared/constants/Colors";
import { ContenidoAudiovisual } from '@/src/shared/data/contenidosAudiovisuales';
import { IGeneroContenidoAudiovisual } from '@/src/shared/data/generosContenidoAudiovisual';
import { ITipoContenidoAudiovisual } from '@/src/shared/data/tiposContenidoAudiovisual';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    useWindowDimensions,
    View
} from 'react-native';

interface AudioVisualCardExtendedProps {
    item: ContenidoAudiovisual;
    tipo: ITipoContenidoAudiovisual;
    generos: IGeneroContenidoAudiovisual[];
}

export const AudioVisualCardExtended: React.FC<AudioVisualCardExtendedProps> = ({
    item,
    tipo,
    generos
}) => {
    const { width: screenWidth } = useWindowDimensions();
    const widthFactor = Platform.OS === 'web' ? 0.3 : 0.8;
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
                        contentFit="cover"
                        cachePolicy="disk"
                        transition={300}
                        onError={() => setImgError(true)}
                    />
                )}

                <View style={styles.title}>
                    <TextPressStart2P style={styles.titleText} numberOfLines={1}>
                        {item.nombre}
                    </TextPressStart2P>
                </View>

                <View style={styles.generosContainer}>
                    <Tag nombre={tipo.singular}/>
                </View>

                <Text style={styles.descripcion} numberOfLines={4}>
                    {item.descripcion}
                </Text>

                <View style={styles.generoTitle}>
                    <TextPressStart2P style={styles.generoTitleText} numberOfLines={1}>
                        GENRES
                    </TextPressStart2P>
                </View>

                {generos.length > 0 && (
                    <View style={styles.generosContainer}>
                        {generos.map((g, i) => (
                            <Tag key={i} nombre={g.nombre}/>
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
    card: {},
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