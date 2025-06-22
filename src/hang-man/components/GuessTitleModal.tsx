import { Button } from '@/src/shared/components/Button';
import { TextPressStart2P } from '@/src/shared/components/TextPressStart2P';
import { Colors } from '@/src/shared/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React, { FC, useEffect, useState } from 'react';
import { Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface GuessTitleModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (title: string) => void;
}

export const GuessTitleModal: FC<GuessTitleModalProps> = ({ visible, onClose, onSubmit }) => {
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
                <View style={[styles.modalView, { borderColor: Colors.grisOscuro }]}>
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

const styles = StyleSheet.create({
    centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' },
    modalView: { backgroundColor: Colors.fondo, borderRadius: 0, padding: 20, width: Platform.OS === 'web' ? 'auto' : '90%', borderWidth: 2 },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    modalTitle: { fontSize: 18, color: '#FFF' },
    input: { borderWidth: 2, borderColor: Colors.purpura, padding: 15, color: '#FFF', fontSize: 16, marginBottom: 10, },
    inputError: { borderColor: Colors.rojo, },
    errorText: { color: Colors.rojo, marginBottom: 10, fontSize: 12, },
    modalFooter: { flexDirection: 'row', justifyContent: 'flex-end' },
}); 