import { TextPressStart2P } from '@/src/shared/components/TextPressStart2P';
import { Href, useRouter } from 'expo-router';
import {
  Platform,
  StyleProp,
  StyleSheet,
  ViewStyle,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '@/src/shared/constants/Colors';

/**
 * Propiedades para el componente GameButton.
 * @interface
 * @property {string} title - Título del juego que se muestra en el botón.
 * @property {string} description - Descripción breve del juego.
 * @property {StyleProp<ViewStyle>} buttonColor - Estilo de color para el botón.
 * @property {Href} url - Ruta a la que se navega al presionar el botón.
 */
interface GameButtonProps {
  title: string;
  description: string;
  buttonColor: StyleProp<ViewStyle>;
  url: Href;
}

/**
 * Componente de botón para acceder a un juego desde la pantalla principal.
 * Muestra el título, una descripción y un botón para jugar.
 *
 * @component
 * @param {GameButtonProps} props - Propiedades del componente.
 * @param {string} props.title - Título del juego.
 * @param {string} props.description - Descripción del juego.
 * @param {StyleProp<ViewStyle>} props.buttonColor - Color de fondo del botón.
 * @param {Href} props.url - Ruta de navegación al juego.
 * @returns {JSX.Element} Botón interactivo para acceder al juego.
 *
 * @example
 * <GameButton
 *   title="Desafío del Ahorcado"
 *   description="Adivina los títulos letra por letra."
 *   buttonColor={{ backgroundColor: '#123456' }}
 *   url="/juego/ahorcado"
 * />
 */
export const GameButton: React.FC<GameButtonProps> = ({
  title,
  description,
  buttonColor,
  url,
}) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(url);
  };

  return (
    <TouchableOpacity
      style={[styles.container, buttonColor]}
      activeOpacity={0.7}
      onPress={handlePress}
    >
      <View style={styles.section}>
        <TextPressStart2P style={styles.title}>{title}</TextPressStart2P>
      </View>

      <View style={styles.section}>
        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={[styles.section, styles.playSection]}>
        <TextPressStart2P style={styles.play}>Jugar</TextPressStart2P>
      </View>
    </TouchableOpacity>
  );
};

/**
 * Estilos para el componente GameButton.
 * @private
 */
const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.gris,
    padding: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  section: {
    width: '100%',
    marginVertical: Platform.OS === 'web' ? 10 : 2,
  },
  playSection: {
    alignItems: 'flex-end',
  },
  title: {
    color: '#FFF',
    fontSize: Platform.OS === 'web' ? 36 : 12,
  },
  description: {
    color: '#FFF',
    fontSize: Platform.OS === 'web' ? 20 : 10,
  },
  play: {
    color: '#FFF',
    fontSize: Platform.OS === 'web' ? 12 : 7,
  },
});
