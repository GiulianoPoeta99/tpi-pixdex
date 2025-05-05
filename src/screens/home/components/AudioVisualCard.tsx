import { TextPressStart2P } from "@/src/components/TextPressStart2P";
import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    useWindowDimensions,
    TouchableOpacity,
    Platform,
    LayoutChangeEvent
} from 'react-native';
import { ContenidoAudiovisual } from '@/src/data/contenidosAudiovisuales';
import { Colors } from "@/src/constants/Colors";
import { generosContenidoAudiovisual } from "@/src/data/generosContenidoAudiovisual";
import { useRouter } from "expo-router";
import { ROUTES } from "@/src/navigation/routes";

interface AudioVisualCardProps {
    item: ContenidoAudiovisual;
    fixedHeight?: number;
    onMeasure?: (height: number) => void;
}

function capitalize(texto: string): string {
    return texto.length === 0
        ? ""
        : texto[0].toUpperCase() + texto.slice(1).toLowerCase();
}

export const AudioVisualCard: React.FC<AudioVisualCardProps> = ({
    item,
    fixedHeight,
    onMeasure
}) => {
    const router = useRouter();
    const { width: screenWidth } = useWindowDimensions();
    const widthFactor = Platform.OS === 'web' ? 0.20 : 0.5;
    const CARD_WIDTH = screenWidth * widthFactor;
    const [imgError, setImgError] = useState(false);

    const handlePress = () => {
        router.push(`${ROUTES.DETAIL}${item.id}`);
    };

    const generos = item.generos.map(id =>
        generosContenidoAudiovisual.find(g => g.id === id)
    );

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
            <View
                style={[
                    styles.card,
                    { width: CARD_WIDTH },
                    fixedHeight != null ? { minHeight: fixedHeight } : undefined
                ]}
                onLayout={(e: LayoutChangeEvent) => {
                    const { height } = e.nativeEvent.layout;
                    if (onMeasure) onMeasure(height);
                }}
            >
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

                {generos.length > 0 && (
                    <View style={styles.generosContainer}>
                        {generos.map((g, i) => (
                            <View key={i} style={styles.genero}>
                                <Text style={styles.generoText} numberOfLines={1}>
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

const styles = StyleSheet.create({
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
        fontSize: Platform.OS === "web" ? 20 : 12,
        color: '#FFF',
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
        fontSize: Platform.OS === "web" ? 16: 10
    },
});