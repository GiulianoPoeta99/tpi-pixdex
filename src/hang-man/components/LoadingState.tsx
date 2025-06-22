import { Colors } from '@/src/shared/constants/Colors';
import React, { FC } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

interface LoadingStateProps {
    message?: string;
}

export const LoadingState: FC<LoadingStateProps> = ({ message = 'Cargando...' }) => (
    <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.purpura} />
        <Text style={styles.loadingText}>{message}</Text>
    </View>
);

const styles = StyleSheet.create({
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loadingText: { color: Colors.purpura, fontSize: 18, marginTop: 10 },
}); 