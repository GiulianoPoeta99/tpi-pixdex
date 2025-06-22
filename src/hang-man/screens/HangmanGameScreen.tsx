import { Colors } from '@/src/shared/constants/Colors';
import { useData } from '@/src/shared/context/DataContext';
import { IContenidoAudiovisual } from '@/database/contenidosAudiovisuales';
import { normalizeString } from '@/src/shared/utils/text';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
    KeyboardModal, 
    GuessTitleModal, 
    GameHeader, 
    GameArea, 
    LoadingState, 
    ErrorState 
} from '../components';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

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
                <LoadingState message="Cargando juego..." />
            </SafeAreaView>
        );
    }

    if (errors.contenidos) {
        return (
            <SafeAreaView style={styles.container}>
                <ErrorState message={errors.contenidos} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <GameHeader
                player={player}
                score={score}
                lives={lives}
                onExit={() => router.push({ pathname: '/', params: {} })}
            />

            <GameArea
                currentWord={currentWord}
                displayedWord={displayedWord}
                onGuessLetter={() => setKeyboardVisible(true)}
                onGuessTitle={() => setGuessTitleVisible(true)}
            />

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
});