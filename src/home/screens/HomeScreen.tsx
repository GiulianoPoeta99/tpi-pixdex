import { ErrorState } from '@/src/shared/components/ErrorState';
import { LoadingState } from '@/src/shared/components/LoadingState';
import { Colors } from '@/src/shared/constants/Colors';
import { useData } from '@/src/shared/context/DataContext';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FilterModal } from '../components/FilterModal';
import { HomeContent } from '../components/HomeContent';

/**
 * Estructura de los filtros aplicados en la pantalla de inicio.
 * @interface
 * @property {number[]} types - IDs de los tipos de contenido seleccionados.
 * @property {number[]} genres - IDs de los géneros seleccionados.
 */
interface Filters {
  types: number[];
  genres: number[];
}

/**
 * Pantalla principal (Home) de la aplicación.
 * Muestra el contenido audiovisual filtrable por tipo y género, y permite abrir un modal de filtros.
 *
 * @component
 * @returns {JSX.Element} Pantalla principal con contenido y filtros.
 *
 * @example
 * <HomeScreen />
 */
export const HomeScreen = () => {
  const { tipos, generos, loading, errors, isInitialized } = useData();
  const [modalVisible, setModalVisible] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    types: [],
    genres: [],
  });

  // Eliminar este useEffect para que el estado predeterminado sea sin filtros tildados
  // React.useEffect(() => {
  //   if (tipos.length > 0 && filters.types.length === 0) {
  //     setFilters(prev => ({
  //       ...prev,
  //       types: tipos.map(t => t.id),
  //     }));
  //   }
  // }, [tipos, filters.types.length]);

  const handleApplyFilters = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const filteredContentTypes = filters.types.length === 0
    ? tipos
    : tipos.filter(tipo => filters.types.includes(tipo.id));

  if (!isInitialized || loading.tipos || loading.generos) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingState message='Cargando...' />
      </SafeAreaView>
    );
  }

  if (errors.tipos || errors.generos) {
    return (
      <SafeAreaView style={styles.container}>
        <ErrorState message='Error:' error={errors.tipos || errors.generos} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <HomeContent
        onFilterPress={() => setModalVisible(true)}
        contentTypes={filteredContentTypes}
        genreFilters={filters.genres}
      />
      <FilterModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onApply={handleApplyFilters}
        contentTypes={tipos}
        genres={generos}
        activeFilters={filters}
      />
    </SafeAreaView>
  );
};

/**
 * Estilos para la pantalla HomeScreen.
 * @private
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fondo,
  },
});
