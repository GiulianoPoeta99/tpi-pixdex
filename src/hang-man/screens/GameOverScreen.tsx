import { Button } from '@/src/shared/components/Button';
import { TextPressStart2P } from '@/src/shared/components/TextPressStart2P';
import { Colors } from '@/src/shared/constants/Colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { playerRepository } from '../repositories/PlayerRepository';

export const GameOverScreen = () => {
    const router = useRouter();
    const { status, score, player } = useLocalSearchParams<{ status: 'win' | 'lose', score: string, player: string }>();

    const isWin = status === 'win';
    const finalScore = parseInt(score, 10);

    useEffect(() => {
        if (player && finalScore > 0) {
            playerRepository.addPlayerScore(player, finalScore);
        }
    }, [player, finalScore]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <TextPressStart2P style={styles.gameOverTitle}>GAME OVER</TextPressStart2P>
                <TextPressStart2P style={[styles.statusTitle, { color: isWin ? Colors.verde : Colors.rojo }]}>
                    {isWin ? 'You Win!' : 'You Lose!'}
                </TextPressStart2P>
                <TextPressStart2P style={styles.score}>Final Score: {finalScore}</TextPressStart2P>
                <Button onPress={() => router.replace('/hang-man')} icon="replay" text="PLAY AGAIN" />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.fondo,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        gap: 30,
    },
    gameOverTitle: {
        fontSize: 48,
        color: Colors.purpura,
        textAlign: 'center',
    },
    statusTitle: {
        fontSize: 32,
        textAlign: 'center',
    },
    score: {
        fontSize: 24,
        color: '#FFF',
        marginBottom: 20,
    },
}); 