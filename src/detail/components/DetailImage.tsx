import { Colors } from "@/src/shared/constants/Colors";
import { Image } from 'expo-image';
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface DetailImageProps {
    uri: string,
    placeholder: string
}

export const DetailImage: React.FC<DetailImageProps> = ({ uri, placeholder }) => {
    const [imgError, setImgError] = useState(false);

    return imgError ? (
        <View style={[styles.image, styles.placeholder]}>
            <Text style={styles.placeholderText} numberOfLines={3}>
                {placeholder}
            </Text>
        </View>
    ) : (
        <Image
            source={{ uri: uri }}
            style={styles.image}
            contentFit="cover"
            cachePolicy="disk"
            transition={300}
            onError={() => setImgError(true)}
        />
    );
};

const styles = StyleSheet.create({
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
})