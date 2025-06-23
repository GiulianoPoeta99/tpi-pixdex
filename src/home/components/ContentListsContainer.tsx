import React from "react";
import { View, StyleSheet } from "react-native";
import { ITipoContenidoAudiovisual } from "@/database/tiposContenidoAudiovisual";
import { AudioVisualList } from "./AudioVisualList";

interface ContentListsContainerProps {
  contentTypes: ITipoContenidoAudiovisual[];
  genreFilters: number[];
}

export const ContentListsContainer: React.FC<ContentListsContainerProps> = ({
  contentTypes,
  genreFilters,
}) => {
  return (
    <View style={styles.container}>
      {contentTypes.map((tipo) => (
        <AudioVisualList
          key={tipo.id}
          tipoId={tipo.id}
          genreFilters={genreFilters}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 20,
    gap: 30,
  },
});
