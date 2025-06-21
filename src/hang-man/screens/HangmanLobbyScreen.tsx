import { Button } from '@/src/shared/components/Button';
import { TextPressStart2P } from '@/src/shared/components/TextPressStart2P';
import { Colors } from '@/src/shared/constants/Colors';
import { useData } from '@/src/shared/context/DataContext';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const HangmanLobbyScreen = () => {
    const router = useRouter();
    const { players, loading, errors, isInitialized, doesPlayerExist } = useData();
    const [modalVisible, setModalVisible] = useState(false);
    const [playerName, setPlayerName] = useState('');
    const [nameError, setNameError] = useState('');

    const handleStartGame = () => {
        const trimmedName = playerName.trim();
        if (!trimmedName) {
            setNameError('Player name cannot be empty.');
            return;
        }
        
        // Verificar si el jugador ya existe
        if (doesPlayerExist(trimmedName)) {
            setNameError('This player name is already taken.');
            return;
        }

        setNameError('');
        setModalVisible(false);
        router.push({
            pathname: '/hang-man/game',
            params: { player: trimmedName },
        } as any);
        setPlayerName('');
    };

    const openModal = () => {
        setNameError('');
        setPlayerName('');
        setModalVisible(true);
    };

    // Ordenar players por score
    const sortedPlayers = React.useMemo(() => {
        return [...players].sort((a, b) => b.score - a.score);
    }, [players]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Button onPress={() => router.push({ pathname: '/', params: {} })} icon="arrow-back" text="BACK" />
            </View>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.mainContent}>
                    <View style={styles.gameInfoContainer}>
                        <TextPressStart2P style={styles.title}>Hangman Challenge</TextPressStart2P>
                        <Text style={styles.description}>
                            Guess the titles of popular TV shows, movies, and anime one letter at a time. You have 5 lives - can you get the highest score?
                        </Text>
                        <Button
                            onPress={openModal}
                            icon="play-arrow"
                            text="START GAME"
                            textStyle={{ fontSize: Platform.OS === 'web' ? 17 : 10 }}
                        />
                        <View style={styles.scoreboardContainer}>
                            <TextPressStart2P style={styles.topPlayersTitle}>Top Players</TextPressStart2P>
                            {loading.players ? (
                                <View style={styles.loadingContainer}>
                                    <ActivityIndicator size="large" color={Colors.purpura} />
                                    <Text style={styles.loadingText}>Cargando...</Text>
                                </View>
                            ) : errors.players ? (
                                <View style={styles.errorContainer}>
                                    <Text style={styles.errorText}>Error: {errors.players}</Text>
                                </View>
                            ) : (
                                <View style={styles.scoreboard}>
                                    {sortedPlayers.slice(0, 5).map((player, index) => (
                                        <View key={player.id} style={styles.scoreRow}>
                                            <Text style={styles.scoreText}>{index + 1}. {player.name}</Text>
                                            <TextPressStart2P style={styles.scoreValue}>{player.score}</TextPressStart2P>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </ScrollView>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={[styles.modalView, { borderColor: Colors.gris }]}>
                        <View style={styles.modalHeader}>
                            <TextPressStart2P style={styles.modalTitle}>Enter Your Name</TextPressStart2P>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <MaterialIcons name="close" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={[styles.input, nameError ? styles.inputError : null]}
                            placeholder="Player name"
                            placeholderTextColor={Colors.gris}
                            value={playerName}
                            onChangeText={setPlayerName}
                        />
                        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
                        <View style={styles.modalFooter}>
                            <Button onPress={handleStartGame} icon="play-arrow" text="START GAME" />
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.fondo },
    scrollContainer: { flex: 1 },
    header: { paddingHorizontal: 20, paddingTop: 20, flexDirection: 'row' },
    mainContent: { alignItems: 'center', padding: 30, },
    gameInfoContainer: {
        width: '100%',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: Colors.grisOscuro,
        padding: 30,
    },
    title: { fontSize: 28, color: Colors.purpura, textAlign: 'center', marginBottom: 20, lineHeight: 40, },
    description: { color: '#FFF', textAlign: 'center', fontSize: 16, lineHeight: 24, marginBottom: 40, fontFamily: 'System', },
    scoreboardContainer: { width: '100%', marginTop: 40 },
    topPlayersTitle: { fontSize: 22, color: Colors.verde, textAlign: 'center', marginBottom: 20, },
    scoreboard: { borderWidth: 2, borderColor: Colors.gris, padding: 20, backgroundColor: Colors.grisOscuro, },
    scoreRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10, },
    scoreText: { color: '#FFF', fontSize: 18, fontFamily: 'System', },
    scoreValue: { color: Colors.verde, fontSize: 15, },
    loadingContainer: { 
        borderWidth: 2, 
        borderColor: Colors.gris, 
        padding: 20, 
        backgroundColor: Colors.grisOscuro,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 100
    },
    loadingText: { 
        color: Colors.purpura, 
        fontSize: 16, 
        marginTop: 10 
    },
    errorContainer: { 
        borderWidth: 2, 
        borderColor: Colors.rojo, 
        padding: 20, 
        backgroundColor: Colors.grisOscuro,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 100
    },
    errorText: { 
        color: Colors.rojo, 
        fontSize: 16, 
        textAlign: 'center' 
    },
    centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)', },
    modalView: { backgroundColor: Colors.fondo, borderRadius: 0, padding: 20, width: Platform.OS === 'web' ? 400 : '90%', borderWidth: 2, },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, },
    modalTitle: { fontSize: 18, color: '#FFF', },
    input: { borderWidth: 2, borderColor: Colors.purpura, padding: 15, color: '#FFF', fontSize: 16, marginBottom: 10, },
    inputError: { borderColor: Colors.rojo, },
    modalFooter: { flexDirection: 'row', justifyContent: 'flex-end', },
}); 