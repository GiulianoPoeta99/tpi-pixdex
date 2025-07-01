import { ITipoContenidoAudiovisual } from "@/database/tiposContenidoAudiovisual";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ContentListsContainer } from "./ContentListsContainer";
import { GameButtonsContainer } from "./GameButtonsContainer";
import { HomeHeader } from "./HomeHeader";

/**
 * Propiedades para el componente HomeContent.
 * @interface
 * @property {() => void} onFilterPress - Función que se ejecuta al presionar el botón de filtro.
 * @property {ITipoContenidoAudiovisual[]} contentTypes - Lista de tipos de contenido audiovisual disponibles.
 * @property {number[]} genreFilters - Lista de identificadores de géneros seleccionados para filtrar el contenido.
 */
interface HomeContentProps {
  onFilterPress: () => void;
  contentTypes: ITipoContenidoAudiovisual[];
  genreFilters: number[];
}

/**
 * Componente principal de contenido para la pantalla de inicio (Home).
 * Incluye el encabezado, los botones de juego y los contenedores de listas de contenido.
 *
 * @component
 * @param {HomeContentProps} props - Propiedades del componente.
 * @param {() => void} props.onFilterPress - Función que se ejecuta al presionar el botón de filtro.
 * @param {ITipoContenidoAudiovisual[]} props.contentTypes - Tipos de contenido audiovisual a mostrar.
 * @param {number[]} props.genreFilters - Filtros de género aplicados a las listas de contenido.
 * @returns {JSX.Element} El contenido principal de la pantalla de inicio.
 *
 * @example
 * <HomeContent
 *   onFilterPress={() => {}}
 *   contentTypes={tipos}
 *   genreFilters={[1, 2]}
 * />
 */
export const HomeContent: React.FC<HomeContentProps> = ({
  onFilterPress,
  contentTypes,
  genreFilters,
}) => {
  return (
    <ScrollView style={styles.scrollView}>
      <HomeHeader onFilterPress={onFilterPress} />
      <GameButtonsContainer />
      <ContentListsContainer
        contentTypes={contentTypes}
        genreFilters={genreFilters}
      />
    </ScrollView>
  );
};

/**
 * Estilos para el componente HomeContent.
 * @private
 */
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});
