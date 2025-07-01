import { Button } from '@/src/shared/components/Button';
import { EmailVerificationBanner } from '@/src/shared/components/EmailVerificationBanner';
import { TextPressStart2P } from '@/src/shared/components/TextPressStart2P';
import { Colors } from '@/src/shared/constants/Colors';
import { useData } from '@/src/shared/context/DataContext';
import { useEmailVerification } from '@/src/shared/hooks/useEmailVerification';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PlayerNameModal, Scoreboard } from '../components';

export const HangmanLobbyScreen = () => {
  const router = useRouter();
  const { players, loading, errors, doesPlayerExist } = useData();
  const {
    isEmailVerified,
    isLoading: emailLoading,
    error: emailError,
  } = useEmailVerification();
  const [modalVisible, setModalVisible] = useState(false);

  const handleStartGame = (playerName: string) => {
    setModalVisible(false);
    router.push({
      pathname: '/hang-man/game',
      params: { player: playerName },
    } as any);
  };

  const openModal = () => {
    if (!isEmailVerified) {
      Alert.alert(
        'Email No Verificado',
        'Debes verificar tu email antes de poder jugar y guardar tus puntajes. Por favor, revisa tu bandeja de entrada y haz clic en el enlace de verificación.',
        [{ text: 'Entendido', style: 'default' }]
      );
      return;
    }

    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button
          onPress={() => router.push({ pathname: '/', params: {} })}
          icon='arrow-back'
          text='BACK'
        />
      </View>

      <EmailVerificationBanner
        isEmailVerified={isEmailVerified}
        isLoading={emailLoading}
        error={emailError}
      />

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.mainContent}>
          <View style={styles.gameInfoContainer}>
            <TextPressStart2P style={styles.title}>
              Hangman Challenge
            </TextPressStart2P>
            <Text style={styles.description}>
              Guess the titles of popular TV shows, movies, and anime one letter
              at a time. You have 5 lives - can you get the highest score?
            </Text>
            <Button
              onPress={openModal}
              icon='play-arrow'
              text='START GAME'
              textStyle={{ fontSize: Platform.OS === 'web' ? 17 : 10 }}
              disabled={!isEmailVerified || emailLoading}
            />
            <Scoreboard
              players={players}
              loading={loading.players}
              error={errors.players}
            />
          </View>
        </View>
      </ScrollView>

      <PlayerNameModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleStartGame}
        doesPlayerExist={doesPlayerExist}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.fondo },
  scrollContainer: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 20, flexDirection: 'row' },
  mainContent: { alignItems: 'center', padding: 30 },
  gameInfoContainer: {
    width: '100%',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: Colors.grisOscuro,
    padding: 30,
  },
  title: {
    fontSize: 28,
    color: Colors.purpura,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 40,
  },
  description: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 40,
    fontFamily: 'System',
  },
});
