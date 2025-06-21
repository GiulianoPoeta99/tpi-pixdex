import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { ROUTES } from '@/src/shared/navigation/routes';
import { Colors } from '@/src/shared/constants/Colors';
import { GameButton } from './GameButton';

export const GameButtonsContainer: React.FC = () => {
    return (
        <View style={styles.container}>
            <GameButton
                title="Desafío del Ahorcado"
                description="Adivina los títulos letra por letra. ¿Cuántos puedes identificar?"
                buttonColor={{ backgroundColor: Colors.purpura }}
                url={ROUTES.HANG_MAN}
            />
            <GameButton
                title="Pixel Reveal"
                description="Identifica títulos desde imágenes pixeladas. ¡Pon a prueba tu memoria visual!"
                buttonColor={[{ backgroundColor: Colors.verde }]}
                url={ROUTES.PIXEL_REVEAL}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        gap: Platform.OS === "web" ? 20 : 14
    },
}); 