import { IContenidoAudiovisual } from '@/database/contenidosAudiovisuales';
import { ITipoContenidoAudiovisual } from '@/database/tiposContenidoAudiovisual';
import { DetailImage } from '@/src/shared/components/DetailImage';
import { GenerosList } from '@/src/shared/components/GenerosList';
import { Tag } from '@/src/shared/components/Tag';
import { TextPressStart2P } from '@/src/shared/components/TextPressStart2P';
import { Colors } from '@/src/shared/constants/Colors';
import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

/**
 * Propiedades para el componente AudioVisualCardExtended.
 * @interface
 * @property {IContenidoAudiovisual} item - Objeto de contenido audiovisual a mostrar en la tarjeta extendida.
 * @property {ITipoContenidoAudiovisual} tipo - Tipo de contenido audiovisual asociado al item.
 */
interface AudioVisualCardExtendedProps {
  item: IContenidoAudiovisual;
  tipo: ITipoContenidoAudiovisual;
}

/**
 * Tarjeta extendida para mostrar información detallada de un contenido audiovisual.
 * Incluye imagen, título, tipo, descripción y géneros asociados.
 *
 * @component
 * @param {AudioVisualCardExtendedProps} props - Propiedades del componente.
 * @param {IContenidoAudiovisual} props.item - Contenido audiovisual a mostrar.
 * @param {ITipoContenidoAudiovisual} props.tipo - Tipo de contenido audiovisual asociado.
 * @returns {JSX.Element} Tarjeta extendida de contenido audiovisual.
 *
 * @example
 * <AudioVisualCardExtended item={contenido} tipo={tipo} />
 */
export const AudioVisualCardExtended: React.FC<
  AudioVisualCardExtendedProps
> = ({ item, tipo }) => {
  const { width: screenWidth } = useWindowDimensions();
  const widthFactor = Platform.OS === 'web' ? 0.3 : 0.8;
  const CARD_WIDTH = screenWidth * widthFactor;

  return (
    <View style={styles.container}>
      <View style={[styles.card, { width: CARD_WIDTH }]}>
        <DetailImage
          uri={item.imageUrl?.toString()}
          placeholder={item.nombre}
        />

        <View style={styles.title}>
          <TextPressStart2P style={styles.titleText} numberOfLines={4}>
            {item.nombre}
          </TextPressStart2P>
        </View>

        <View style={styles.generosContainer}>
          <Tag nombre={tipo.singular} />
        </View>

        <Text style={styles.descripcion} numberOfLines={4}>
          {item.descripcion}
        </Text>

        <View style={styles.generoTitle}>
          <TextPressStart2P style={styles.generoTitleText} numberOfLines={1}>
            GENRES
          </TextPressStart2P>
        </View>

        <View style={styles.generosContainer}>
          <GenerosList generoIds={item.generos} />
        </View>
      </View>
    </View>
  );
};

/**
 * Estilos para el componente AudioVisualCardExtended.
 * @private
 */
const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.grisOscuro,
    padding: 20,
    flex: 1,
  },
  card: {},
  image: {
    width: '100%',
    aspectRatio: 2 / 3,
    backgroundColor: '#FFF',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.grisOscuro,
    padding: 10,
  },
  placeholderText: {
    color: '#FFF',
    fontSize: 14,
    textAlign: 'center',
  },
  title: {
    padding: 15,
  },
  titleText: {
    fontSize: 20,
    color: Colors.purpura,
  },
  generosContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  genero: {
    backgroundColor: Colors.grisOscuro,
    padding: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  generoText: {
    color: '#FFF',
  },
  descripcion: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    color: '#FFF',
  },
  generoTitle: {
    padding: 15,
  },
  generoTitleText: {
    fontSize: 14,
    color: Colors.verde,
  },
});
