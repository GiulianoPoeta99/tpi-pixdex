import { Button } from '@/src/shared/components/Button';
import { TextPressStart2P } from '@/src/shared/components/TextPressStart2P';
import { Colors } from '@/src/shared/constants/Colors';
import { useAuth } from '@/src/shared/context/AuthContext';
import { useData } from '@/src/shared/context/DataContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const GameOverScreen = () => {
  const router = useRouter();
  const { addPlayerScore } = useData();
  const { user } = useAuth();
  const { status, score, player } = useLocalSearchParams<{
    status: 'win' | 'lose';
    score: string;
    player: string;
  }>();

  const isWin = status === 'win';
  const finalScore = parseInt(score, 10);

  useEffect(() => {
    if (user && player && finalScore > 0) {
      addPlayerScore(player, finalScore);
    } else if (!user) {
      console.log('⚠️ Usuario no autenticado, no se puede guardar puntaje');
    }
  }, [player, finalScore, addPlayerScore, user]);

  const handlePlayAgain = () => {
    router.push({
      pathname: '/hang-man',
      params: {},
    });
  };

  const handleExit = () => {
    router.push({
      pathname: '/',
      params: {},
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TextPressStart2P style={styles.gameOverTitle}>
          GAME OVER
        </TextPressStart2P>
        <TextPressStart2P
          style={[
            styles.statusTitle,
            { color: isWin ? Colors.verde : Colors.rojo },
          ]}
        >
          {isWin ? 'You Win!' : 'You Lose!'}
        </TextPressStart2P>
        <TextPressStart2P style={styles.score}>
          Final Score: {finalScore}
        </TextPressStart2P>
        <View style={styles.buttonContainer}>
          <Button onPress={handlePlayAgain} icon='replay' text='PLAY AGAIN' />
          <Button onPress={handleExit} icon='home' text='EXIT' />
        </View>
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
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
  },
});
