import { Button } from '@/src/shared/components/Button';
import { TextPressStart2P } from '@/src/shared/components/TextPressStart2P';
import { Colors } from '@/src/shared/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React, { FC } from 'react';
import { Modal, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

interface KeyboardModalProps {
    visible: boolean;
    onClose: () => void;
    onSelectLetter: (letter: string) => void;
    guessedLetters: string[];
}

export const KeyboardModal: FC<KeyboardModalProps> = ({ visible, onClose, onSelectLetter, guessedLetters }) => (
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

const styles = StyleSheet.create({
    centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' },
    modalView: { backgroundColor: Colors.fondo, borderRadius: 0, padding: 20, width: Platform.OS === 'web' ? 'auto' : '90%', borderWidth: 2 },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    modalTitle: { fontSize: 18, color: '#FFF' },
    keyboard: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10 },
    key: { paddingVertical: 8, paddingHorizontal: 0, width: 45, alignItems: 'center' },
    keyText: { color: '#FFF', fontSize: 18 },
}); 