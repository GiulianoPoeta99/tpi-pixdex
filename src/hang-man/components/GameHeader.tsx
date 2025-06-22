import { Button } from '@/src/shared/components/Button';
import { Colors } from '@/src/shared/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface GameHeaderProps {
    player: string;
    score: number;
    lives: number;
    onExit: () => void;
}

export const GameHeader: FC<GameHeaderProps> = ({ player, score, lives, onExit }) => (
    <View style={styles.header}>
        <Button onPress={onExit} icon="exit-to-app" text="EXIT" />
        <View style={styles.livesContainer}>
            {[...Array(5)].map((_, i) => (
                <MaterialIcons key={i} name={i < lives ? "favorite" : "favorite-border"} size={25} color={Colors.purpura} />
            ))}
        </View>
        <View>
            <Text style={styles.playerText}>Player: {player}</Text>
            <Text style={styles.playerText}>Score: {score}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, },
    livesContainer: { flexDirection: 'row', gap: 5 },
    playerText: { color: '#FFF', fontSize: 14, fontFamily: 'System' },
}); 