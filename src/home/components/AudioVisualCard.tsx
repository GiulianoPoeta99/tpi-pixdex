import { DetailImage } from '@/src/shared/components/DetailImage';
import { GenerosList } from '@/src/shared/components/GenerosList';
import { TextPressStart2P } from '@/src/shared/components/TextPressStart2P';
import { Colors } from '@/src/shared/constants/Colors';
import { IContenidoAudiovisual } from '@/database/contenidosAudiovisuales';
import { ROUTES } from '@/src/shared/navigation/routes';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  LayoutChangeEvent,
  Platform,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

/**
 * Propiedades para el componente AudioVisualCard.
 * @interface
 * @property {IContenidoAudiovisual} item - Objeto de contenido audiovisual a mostrar en la tarjeta.
 * @property {number} [fixedHeight] - Altura fija opcional para la tarjeta.
 * @property {(height: number) => void} [onMeasure] - Callback opcional para medir la altura de la tarjeta.
 */
interface AudioVisualCardProps {
  item: IContenidoAudiovisual;
  fixedHeight?: number;
  onMeasure?: (height: number) => void;
}

/**
 * Tarjeta visual para mostrar información de un contenido audiovisual.
 * Incluye imagen, título y géneros asociados. Permite navegar al detalle al hacer click.
 *
 * @component
 * @param {AudioVisualCardProps} props - Propiedades del componente.
 * @param {IContenidoAudiovisual} props.item - Contenido audiovisual a mostrar.
 * @param {number} [props.fixedHeight] - Altura fija opcional para la tarjeta.
 * @param {(height: number) => void} [props.onMeasure] - Callback para medir la altura de la tarjeta.
 * @returns {JSX.Element} Tarjeta de contenido audiovisual.
 *
 * @example
 * <AudioVisualCard item={contenido} fixedHeight={200} onMeasure={(h) => {}} />
 */
export const AudioVisualCard: React.FC<AudioVisualCardProps> = ({
  item,
  fixedHeight,
  onMeasure,
}) => {
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();
  const widthFactor = Platform.OS === 'web' ? 0.2 : 0.5;
  const CARD_WIDTH = screenWidth * widthFactor;

  const handlePress = () => {
    router.push(`${ROUTES.DETAIL}/${item.id}` as any);
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
      <View
        style={[
          styles.card,
          { width: CARD_WIDTH },
          fixedHeight != null ? { minHeight: fixedHeight } : undefined,
        ]}
        onLayout={(e: LayoutChangeEvent) => {
          const { height } = e.nativeEvent.layout;
          if (onMeasure) onMeasure(height);
        }}
      >
        <DetailImage uri={item.imageUrl} placeholder={item.nombre} />

        <View style={styles.title}>
          <TextPressStart2P style={styles.titleText} numberOfLines={1}>
            {item.nombre}
          </TextPressStart2P>
        </View>

        <View style={styles.generosContainer}>
          <GenerosList generoIds={item.generos} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

/**
 * Estilos para el componente AudioVisualCard.
 * @private
 */
const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderTopColor: Colors.purpuraOscuro,
    borderRightColor: Colors.purpuraOscuro,
    borderBottomColor: Colors.purpuraClaro,
    borderLeftColor: Colors.purpuraClaro,
  },
  title: {
    padding: 15,
  },
  titleText: {
    fontSize: Platform.OS === 'web' ? 20 : 12,
    color: '#FFF',
  },
  generosContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
});
