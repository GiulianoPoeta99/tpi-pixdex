import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { useData } from '../context/DataContext';
import { Tag } from './Tag';

/**
 * Propiedades para el componente GenerosList.
 * @interface
 * @property {number[]} [generoIds] - IDs de los géneros a mostrar.
 * @property {string[]} [generoNombres] - Nombres de los géneros a mostrar.
 */
interface GenerosListProps {
  generoIds?: number[];
  generoNombres?: string[];
}

/**
 * Lista de géneros audiovisuales, renderizada como etiquetas (tags).
 * Permite mostrar géneros por ID o por nombre, mostrando estados de carga y error.
 *
 * @component
 * @param {GenerosListProps} props - Propiedades del componente.
 * @param {number[]} [props.generoIds] - IDs de los géneros a mostrar.
 * @param {string[]} [props.generoNombres] - Nombres de los géneros a mostrar.
 * @returns {JSX.Element|null} Lista de géneros como etiquetas o null si no hay géneros.
 *
 * @example
 * <GenerosList generoIds={[1, 2]} />
 * <GenerosList generoNombres={["Acción", "Comedia"]} />
 */
export const GenerosList: React.FC<GenerosListProps> = ({
  generoIds,
  generoNombres,
}) => {
  const { generos, getGenerosByIds, loading, errors } = useData();

  const generosToShow = React.useMemo(() => {
    if (!generos.length) return [];

    if (generoIds) {
      return getGenerosByIds(generoIds);
    } else if (generoNombres) {
      return generos.filter(g => generoNombres.includes(g.nombre));
    }

    return [];
  }, [generos, generoIds, generoNombres, getGenerosByIds]);

  if (loading.generos) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='small' color='#666' />
      </View>
    );
  }

  if (errors.generos) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {errors.generos}</Text>
      </View>
    );
  }

  if (generosToShow.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {generosToShow.map((genero, index) => (
        <Tag key={index} nombre={genero.nombre} />
      ))}
    </View>
  );
};

/**
 * Estilos para el componente GenerosList.
 * @private
 */
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
  },
});
