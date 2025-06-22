import { Button } from '@/src/shared/components/Button';
import { Colors } from '@/src/shared/constants/Colors';
import { IContenidoAudiovisual } from '@/database/contenidosAudiovisuales';
import React, { FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface GameAreaProps {
    currentWord: IContenidoAudiovisual | null;
    displayedWord: string;
    onGuessLetter: () => void;
    onGuessTitle: () => void;
}

export const GameArea: FC<GameAreaProps> = ({ currentWord, displayedWord, onGuessLetter, onGuessTitle }) => (
    <View style={styles.gameArea}>
        <View style={styles.gameActions}>
            <Button onPress={onGuessTitle} icon="check-circle" text="GUESS TITLE" />
            <Button onPress={onGuessLetter} icon="keyboard" text="GUESS LETTER" />
        </View>
        <View style={styles.imageContainer}>
            {currentWord && <Image source={{ uri: currentWord.imageUrl }} style={styles.image} resizeMode="cover" />}
        </View>
        <Text style={styles.imageSubtitle}>{currentWord?.nombre}</Text>
        <View style={styles.wordContainer}>
            <Text style={styles.wordText}>{displayedWord}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    gameArea: { flex: 1, paddingHorizontal: 20, paddingBottom: 20, borderWidth: 4, borderColor: Colors.grisOscuro, margin: 20, },
    gameActions: { flexDirection: 'row', justifyContent: 'space-around', paddingTop: 20, marginBottom: 20, gap: 10 },
    imageContainer: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: Colors.grisOscuro, overflow: 'hidden' },
    image: { width: '100%', height: '100%' },
    imageSubtitle: { color: Colors.grisOscuro, fontSize: 12, textAlign: 'center', marginTop: 8, marginBottom: 20 },
    wordContainer: { padding: 20, backgroundColor: Colors.grisOscuro, borderWidth: 0 },
    wordText: { fontSize: 32, color: '#FFF', textAlign: 'center', letterSpacing: 8 },
}); 