import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { ROUTES } from '../navigation/routes';
import { Button } from './Button';
import { TextPressStart2P } from './TextPressStart2P';

interface UnderConstructionScreenProps {
  title?: string;
  message?: string;
  progressPercentage?: number;
}

/**
 * Pantalla que muestra que una página está en construcción.
 * 
 * @component
 * @param {string} title - Título opcional de la pantalla (por defecto: "En Construcción")
 * @param {string} message - Mensaje opcional adicional (por defecto: "Esta página estará disponible pronto")
 * @param {number} progressPercentage - Porcentaje de progreso opcional (por defecto: 25)
 * @returns {JSX.Element} Pantalla de construcción
 * 
 * @example
 * <UnderConstructionScreen />
 * <UnderConstructionScreen title="Juego en Desarrollo" message="Próximamente disponible" progressPercentage={50} />
 */
export const UnderConstructionScreen: React.FC<UnderConstructionScreenProps> = ({
  title = 'En Construcción',
  message = 'Esta página estará disponible pronto',
  progressPercentage = 25
}) => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push(ROUTES.HOME as any);
  };

  // Asegurar que el porcentaje esté entre 0 y 100
  const clampedProgress = Math.max(0, Math.min(100, progressPercentage));

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🚧</Text>
        </View>
        
        <TextPressStart2P style={styles.title}>
          {title}
        </TextPressStart2P>
        
        <Text style={styles.message}>
          {message}
        </Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${clampedProgress}%` }]} />
          </View>
          <Text style={styles.progressText}>Progreso: {clampedProgress}%</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button 
            onPress={handleGoHome}
            icon="home"
            text="VOLVER AL INICIO"
          />
        </View>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  content: {
    alignItems: 'center',
    maxWidth: 300,
  },
  iconContainer: {
    marginBottom: 30,
  },
  icon: {
    fontSize: 80,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    color: '#ff6b6b',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(255, 107, 107, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  message: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
    opacity: 0.8,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
    marginBottom: 10,
    overflow: 'hidden',
  },
  progressFill: {
    width: '25%',
    height: '100%',
    backgroundColor: '#ff6b6b',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.7,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
}); 