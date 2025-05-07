import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";

interface TagProps {
    nombre: string
}

function capitalize(texto: string): string {
    return texto.length === 0
        ? ""
        : texto[0].toUpperCase() + texto.slice(1).toLowerCase();
}

export const Tag: React.FC<TagProps> = ({nombre}) => {
    return (
        <View style={styles.genero}>
            <Text style={styles.generoText} numberOfLines={1}>
                {capitalize(nombre)}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
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