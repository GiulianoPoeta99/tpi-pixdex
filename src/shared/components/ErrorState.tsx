import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

interface ErrorStateProps {
    message?: string;
    error?: string | null;
    color?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ 
    message = 'Error:', 
    error, 
    color = 'red' 
}) => {
    const displayMessage = error ? `${message} ${error}` : message;
    
    return (
        <View style={styles.container}>
            <Text style={[styles.text, { color }]}>{displayMessage}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
    },
}); 