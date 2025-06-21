import { Button } from '@/src/shared/components/Button';
import { TextPressStart2P } from '@/src/shared/components/TextPressStart2P';
import { Colors } from '@/src/shared/constants/Colors';
import { useData } from '@/src/shared/context/DataContext';
import { IContenidoAudiovisual } from '@/database/contenidosAudiovisuales';
import { normalizeString } from '@/src/shared/utils/text';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Image, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

interface KeyboardModalProps {
    visible: boolean;
    onClose: () => void;
    onSelectLetter: (letter: string) => void;
    guessedLetters: string[];
}

const KeyboardModal: FC<KeyboardModalProps> = ({ visible, onClose, onSelectLetter, guessedLetters }) => (
    <Modal visible={visible} transparent={true} onRequestClose={onClose} animationType="fade">
        <View style={styles.centeredView}>
            <View style={[styles.modalView, { borderColor: Colors.gris }]}>
                <View style={styles.modalHeader}>
                    <TextPressStart2P style={styles.modalTitle}>Guess a Letter</TextPressStart2P>
                    <TouchableOpacity onPress={onClose}><MaterialIcons name="close" size={24} color="white" /></TouchableOpacity>
                </View>
                <View style={styles.keyboard}>
                    {ALPHABET.map(letter => {
                        const isGuessed = guessedLetters.includes(letter);
                        return (
                            <Button
                                key={letter}
                                text={letter}
                                onPress={() => onSelectLetter(letter)}
                                style={styles.key}
                                textStyle={styles.keyText}
                                disabled={isGuessed}
                            />
                        );
                    })}
                </View>
            </View>
        </View>
    </Modal>
);

interface GuessTitleModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (title: string) => void;
}

const GuessTitleModal: FC<GuessTitleModalProps> = ({ visible, onClose, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (!title.trim()) {
            setError('Please enter a title.');
            return;
        }
        setError('');
        onSubmit(title);
        setTitle('');
    };

    const openModal = () => {
        setTitle('');
        setError('');
    };

    useEffect(() => {
        if (visible) openModal();
    }, [visible])

    return (
        <Modal visible={visible} transparent={true} onRequestClose={onClose} animationType="fade">
            <View style={styles.centeredView}>
                <View style={[styles.modalView, { borderColor: Colors.gris }]}>
                    <View style={styles.modalHeader}>
                        <TextPressStart2P style={styles.modalTitle}>Guess the Title</TextPressStart2P>
                        <TouchableOpacity onPress={onClose}><MaterialIcons name="close" size={24} color="white" /></TouchableOpacity>
                    </View>
                    <TextInput
                        style={[styles.input, error ? styles.inputError : null]}
                        placeholder="Enter complete title"
                        placeholderTextColor={Colors.gris}
                        value={title}
                        onChangeText={setTitle}
                        autoCapitalize="words"
                        autoCorrect={false}
                    />
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}
                    <View style={styles.modalFooter}>
                        <Button onPress={handleSubmit} text="SUBMIT GUESS" icon="check-circle" />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export const HangmanGameScreen = () => {
    const router = useRouter();
    const { player } = useLocalSearchParams<{ player: string }>();
    const { contenidos, loading, errors, isInitialized } = useData();

    const [currentWord, setCurrentWord] = useState<IContenidoAudiovisual | null>(null);
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const [guessedWords, setGuessedWords] = useState<number[]>([]);
    const [lives, setLives] = useState(5);
    const [score, setScore] = useState(0);
    const [isLoadingNextWord, setIsLoadingNextWord] = useState(false);

    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [guessTitleVisible, setGuessTitleVisible] = useState(false);

    const WIN_CONDITION_COUNT = Math.ceil(contenidos.length / 2);

    const loadNextWord = useCallback(() => {
        if (isLoadingNextWord) return; // Evitar múltiples llamadas
        
        setIsLoadingNextWord(true);
        
        const availableWords = contenidos.filter(
            (content: IContenidoAudiovisual) => !guessedWords.includes(content.id)
        );

        if (availableWords.length === 0) {
            endGame('win');
            return;
        }

        const randomContent = availableWords[Math.floor(Math.random() * availableWords.length)];
        setCurrentWord(randomContent);
        setGuessedLetters([]);
        
        // Pequeño delay para evitar parpadeo
        setTimeout(() => {
            setIsLoadingNextWord(false);
        }, 100);
    }, [guessedWords, contenidos, isLoadingNextWord]);

    const endGame = (status: 'win' | 'lose') => {
        router.push({
            pathname: '/hang-man/game-over',
            params: { status, score: score.toString(), player }
        });
    };

    // Cargar primera palabra solo una vez
    useEffect(() => {
        if (isInitialized && contenidos.length > 0 && !currentWord && !isLoadingNextWord) {
            loadNextWord();
        }
    }, [isInitialized, contenidos.length, currentWord, isLoadingNextWord, loadNextWord]);

    useEffect(() => {
        if (lives <= 0) {
            endGame('lose');
        }
    }, [lives]);

    const normalizedWordToGuess = currentWord ? normalizeString(currentWord.nombre).toUpperCase() : '';
    const originalWordToGuess = currentWord?.nombre ?? '';

    // Verificar si la palabra está completamente adivinada
    const isWordGuessed = normalizedWordToGuess && 
        normalizedWordToGuess.replace(/[^A-Z]/g, '').split('').every(letter => guessedLetters.includes(letter));

    useEffect(() => {
        if (isWordGuessed && currentWord && !isLoadingNextWord) {
            handleCorrectGuess();
        }
    }, [isWordGuessed, currentWord, isLoadingNextWord]);

    const handleCorrectGuess = () => {
        if (!currentWord || isLoadingNextWord) return;

        const newScore = score + 1;
        const newGuessedWords = [...guessedWords, currentWord.id];

        setScore(newScore);
        setGuessedWords(newGuessedWords);

        if (newGuessedWords.length >= WIN_CONDITION_COUNT) {
            endGame('win');
        } else {
            setTimeout(() => {
                loadNextWord();
            }, 1000);
        }
    };

    const handleGuessLetter = (letter: string) => {
        setKeyboardVisible(false);
        if (!guessedLetters.includes(letter)) {
            setGuessedLetters(prev => [...prev, letter]);

            if (!normalizedWordToGuess.includes(letter)) {
                setLives(prev => prev - 1);
            }
        }
    };

    const handleGuessTitle = (title: string) => {
        setGuessTitleVisible(false);
        
        // Mejorar la normalización para caracteres especiales
        const normalizedGuess = normalizeString(title.trim()).toUpperCase();
        const normalizedTarget = normalizedWordToGuess;
        
        console.log('Guess:', normalizedGuess);
        console.log('Target:', normalizedTarget);
        console.log('Match:', normalizedGuess === normalizedTarget);
        
        if (normalizedGuess === normalizedTarget) {
            // Adivinar todas las letras para que se complete la palabra
            setGuessedLetters(ALPHABET);
        } else {
            setLives(prev => prev - 1);
        }
    };

    const displayedWord = originalWordToGuess.split('').map((char: string) => {
        if (char === ' ') return ' ';
        const normalizedChar = normalizeString(char).toUpperCase();
        if (!ALPHABET.includes(normalizedChar)) return char;
        if (guessedLetters.includes(normalizedChar)) return char;
        return '_';
    }).join(' ');

    if (!isInitialized || loading.contenidos) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={Colors.purpura} />
                    <Text style={styles.loadingText}>Cargando juego...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (errors.contenidos) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Error: {errors.contenidos}</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Button onPress={() => router.push({ pathname: '/', params: {} })} icon="exit-to-app" text="EXIT" />
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

            <View style={styles.gameArea}>
                <View style={styles.gameActions}>
                    <Button onPress={() => setGuessTitleVisible(true)} icon="check-circle" text="GUESS TITLE" />
                    <Button onPress={() => setKeyboardVisible(true)} icon="keyboard" text="GUESS LETTER" />
                </View>
                <View style={styles.imageContainer}>
                    {currentWord && <Image source={{ uri: currentWord.imageUrl }} style={styles.image} resizeMode="cover" />}
                </View>
                <Text style={styles.imageSubtitle}>{currentWord?.nombre}</Text>
                <View style={styles.wordContainer}>
                    <Text style={styles.wordText}>{displayedWord}</Text>
                </View>
            </View>

            <KeyboardModal
                visible={keyboardVisible}
                onClose={() => setKeyboardVisible(false)}
                onSelectLetter={handleGuessLetter}
                guessedLetters={guessedLetters}
            />
            <GuessTitleModal
                visible={guessTitleVisible}
                onClose={() => setGuessTitleVisible(false)}
                onSubmit={handleGuessTitle}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.fondo },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, },
    livesContainer: { flexDirection: 'row', gap: 5 },
    playerText: { color: '#FFF', fontSize: 14, fontFamily: 'System' },
    gameArea: { flex: 1, paddingHorizontal: 20, paddingBottom: 20, borderWidth: 4, borderColor: Colors.grisOscuro, margin: 20, },
    gameActions: { flexDirection: 'row', justifyContent: 'space-around', paddingTop: 20, marginBottom: 20, gap: 10 },
    imageContainer: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: Colors.grisOscuro, overflow: 'hidden' },
    image: { width: '100%', height: '100%' },
    imageSubtitle: { color: Colors.grisOscuro, fontSize: 12, textAlign: 'center', marginTop: 8, marginBottom: 20 },
    wordContainer: { padding: 20, backgroundColor: Colors.grisOscuro, borderWidth: 0 },
    wordText: { fontSize: 32, color: '#FFF', textAlign: 'center', letterSpacing: 8 },
    centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' },
    modalView: { backgroundColor: Colors.fondo, borderRadius: 0, padding: 20, width: Platform.OS === 'web' ? 'auto' : '90%', borderWidth: 2 },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    modalTitle: { fontSize: 18, color: '#FFF' },
    input: { borderWidth: 2, borderColor: Colors.purpura, padding: 15, color: '#FFF', fontSize: 16, marginBottom: 10, },
    inputError: { borderColor: Colors.rojo, },
    errorText: { color: Colors.rojo, marginBottom: 10, fontSize: 12, },
    modalFooter: { flexDirection: 'row', justifyContent: 'flex-end' },
    keyboard: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10 },
    key: { paddingVertical: 8, paddingHorizontal: 0, width: 45, alignItems: 'center' },
    keyText: { color: '#FFF', fontSize: 18 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loadingText: { color: Colors.purpura, fontSize: 18, marginTop: 10 },
    errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});