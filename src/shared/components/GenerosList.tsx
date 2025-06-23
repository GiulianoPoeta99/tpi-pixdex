import React from "react";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { useData } from "../context/DataContext";
import { Tag } from "./Tag";

interface GenerosListProps {
  generoIds?: number[];
  generoNombres?: string[];
}

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
      return generos.filter((g) => generoNombres.includes(g.nombre));
    }

    return [];
  }, [generos, generoIds, generoNombres, getGenerosByIds]);

  if (loading.generos) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="#666" />
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  errorText: {
    fontSize: 12,
    color: "red",
  },
});
