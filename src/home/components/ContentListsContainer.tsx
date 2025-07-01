import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ITipoContenidoAudiovisual } from '@/database/tiposContenidoAudiovisual';
import { AudioVisualList } from './AudioVisualList';

/**
 * Propiedades para el componente ContentListsContainer.
 * @interface
 * @property {ITipoContenidoAudiovisual[]} contentTypes - Lista de tipos de contenido audiovisual a mostrar.
 * @property {number[]} genreFilters - Lista de identificadores de géneros seleccionados para filtrar el contenido.
 */
interface ContentListsContainerProps {
  contentTypes: ITipoContenidoAudiovisual[];
  genreFilters: number[];
}

/**
 * Contenedor de listas de contenido audiovisual.
 * Renderiza una lista por cada tipo de contenido, aplicando los filtros de género seleccionados.
 *
 * @component
 * @param {ContentListsContainerProps} props - Propiedades del componente.
 * @param {ITipoContenidoAudiovisual[]} props.contentTypes - Tipos de contenido audiovisual a mostrar.
 * @param {number[]} props.genreFilters - Filtros de género aplicados a las listas de contenido.
 * @returns {JSX.Element} Contenedor con las listas de contenido audiovisual.
 *
 * @example
 * <ContentListsContainer
 *   contentTypes={tipos}
 *   genreFilters={[1, 2]}
 * />
 */
export const ContentListsContainer: React.FC<ContentListsContainerProps> = ({
  contentTypes,
  genreFilters,
}) => {
  return (
    <View style={styles.container}>
      {contentTypes.map(tipo => (
        <AudioVisualList
          key={tipo.id}
          tipoId={tipo.id}
          genreFilters={genreFilters}
        />
      ))}
    </View>
  );
};

/**
 * Estilos para el componente ContentListsContainer.
 * @private
 */
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 20,
    gap: 30,
  },
});
