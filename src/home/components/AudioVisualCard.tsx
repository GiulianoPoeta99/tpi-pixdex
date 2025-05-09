import { Tag } from "@/src/shared/components/Tag";
import { TextPressStart2P } from "@/src/shared/components/TextPressStart2P";
import { Colors } from "@/src/shared/constants/Colors";
import { ContenidoAudiovisual } from '@/src/shared/data/contenidosAudiovisuales';
import { generosContenidoAudiovisual } from "@/src/shared/data/generosContenidoAudiovisual";
import { ROUTES } from "@/src/shared/navigation/routes";
import { ContenidoAudiovisualRepository } from "@/src/shared/repositories/contenidos-audiovisuales-repository";
import { Image } from 'expo-image';
import { useRouter } from "expo-router";
import React, { useState } from 'react';
import {
    LayoutChangeEvent,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View
} from 'react-native';

interface AudioVisualCardProps {
    item: ContenidoAudiovisual;
    fixedHeight?: number;
    onMeasure?: (height: number) => void;
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

    const generos = ContenidoAudiovisualRepository.getAllGendersForContenidoAudiovisual(item)

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

                {generos.length > 0 && (
                    <View style={styles.generosContainer}>
                        {generos.map((g, i) => (
                            <Tag key={i} nombre={g?.nombre ?? '-'} />
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
});
