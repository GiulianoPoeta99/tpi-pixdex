import { Button } from '@/src/shared/components/Button';
import { TextPressStart2P } from '@/src/shared/components/TextPressStart2P';
import { Colors } from '@/src/shared/constants/Colors';
import { IContenidoAudiovisual, contenidosAudiovisuales } from '@/src/shared/data/contenidosAudiovisuales';
import { normalizeString } from '@/src/shared/utils/text';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Image, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const WIN_CONDITION_COUNT = Math.ceil(contenidosAudiovisuales.length / 2);

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

    const [currentWord, setCurrentWord] = useState<IContenidoAudiovisual | null>(null);
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const [guessedWords, setGuessedWords] = useState<number[]>([]);
    const [lives, setLives] = useState(5);
    const [score, setScore] = useState(0);

    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [guessTitleVisible, setGuessTitleVisible] = useState(false);

    const loadNextWord = useCallback(() => {
        const availableWords = contenidosAudiovisuales.filter(
            content => !guessedWords.includes(content.id)
        );

        if (availableWords.length === 0) {
            endGame('win');
            return;
        }

        const randomContent = availableWords[Math.floor(Math.random() * availableWords.length)];
        setCurrentWord(randomContent);
        setGuessedLetters([]);
    }, [guessedWords]);

    const endGame = (status: 'win' | 'lose') => {
        router.replace({
            pathname: '/hang-man/game-over',
            params: { status, score: score.toString(), player }
        } as any);
    };

    useEffect(() => {
        loadNextWord();
    }, []);

    useEffect(() => {
        if (lives <= 0) {
            endGame('lose');
        }
    }, [lives]);

    const normalizedWordToGuess = currentWord ? normalizeString(currentWord.nombre).toUpperCase() : '';
    const originalWordToGuess = currentWord?.nombre ?? '';

    const isWordGuessed = normalizedWordToGuess && normalizedWordToGuess.replace(/ /g, '').split('').every(letter => guessedLetters.includes(letter));

    useEffect(() => {
        if (isWordGuessed && currentWord) {
            handleCorrectGuess();
        }
    }, [isWordGuessed, currentWord]);

    const handleCorrectGuess = () => {
        if (!currentWord) return;

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
        if (normalizeString(title).toUpperCase() === normalizedWordToGuess) {
            setGuessedLetters(ALPHABET);
        } else {
            setLives(prev => prev - 1);
        }
    };

    const displayedWord = originalWordToGuess.split('').map(char => {
        if (char === ' ') return ' ';
        const normalizedChar = normalizeString(char).toUpperCase();
        if (!ALPHABET.includes(normalizedChar)) return char;
        if (guessedLetters.includes(normalizedChar)) return char;
        return '_';
    }).join(' ');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Button onPress={() => router.back()} icon="exit-to-app" text="EXIT" />
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
    imageSubtitle: { color: Colors.gris, fontSize: 12, textAlign: 'center', marginTop: 8, marginBottom: 20 },
    wordContainer: { padding: 20, backgroundColor: Colors.grisOscuro, borderWidth: 2, borderColor: Colors.gris },
    wordText: { fontSize: 32, color: '#FFF', textAlign: 'center', letterSpacing: 8 },
    centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' },
    modalView: { backgroundColor: Colors.fondo, borderRadius: 8, padding: 20, width: Platform.OS === 'web' ? 'auto' : '90%', borderWidth: 2 },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    modalTitle: { fontSize: 18, color: '#FFF' },
    input: { borderWidth: 2, borderColor: Colors.purpura, padding: 15, color: '#FFF', fontSize: 16, marginBottom: 10, },
    inputError: { borderColor: Colors.rojo, },
    errorText: { color: Colors.rojo, marginBottom: 10, fontSize: 12, },
    modalFooter: { flexDirection: 'row', justifyContent: 'flex-end' },
    keyboard: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10 },
    key: { paddingVertical: 8, paddingHorizontal: 0, width: 45, alignItems: 'center' },
    keyText: { color: '#FFF', fontSize: 18 }
});