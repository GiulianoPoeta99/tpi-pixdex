import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { capitalize } from '../utils/text';
import { TextPressStart2P } from './TextPressStart2P';

interface CheckboxProps {
    label: string;
    checked: boolean;
    onPress: () => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={[styles.box, checked && styles.checkedBox]}>
                {checked && <MaterialIcons name="check" size={18} color={Colors.fondo} />}
            </View>
            <TextPressStart2P style={styles.label}>{capitalize(label)}</TextPressStart2P>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        width: Platform.OS === 'web' ? 180 : 150,
    },
    box: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: Colors.purpuraClaro,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkedBox: {
        backgroundColor: Colors.purpuraClaro,
    },
    label: {
        fontSize: Platform.OS === 'web' ? 11 : 9,
        color: '#FFF',
    },
}); 