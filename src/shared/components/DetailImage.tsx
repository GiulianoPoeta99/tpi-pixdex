import { Colors } from "@/src/shared/constants/Colors";
import { Image } from "expo-image";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

/**
 * Propiedades para el componente DetailImage.
 * @interface
 * @property {string} uri - URL de la imagen a mostrar.
 * @property {string} placeholder - Texto alternativo a mostrar si la imagen falla.
 */
interface DetailImageProps {
  uri: string;
  placeholder: string;
}

/**
 * Componente visual para mostrar una imagen de detalle con manejo de error.
 * Si la imagen no carga, muestra un texto alternativo (placeholder).
 *
 * @component
 * @param {DetailImageProps} props - Propiedades del componente.
 * @param {string} props.uri - URL de la imagen a mostrar.
 * @param {string} props.placeholder - Texto alternativo si la imagen falla.
 * @returns {JSX.Element} Imagen o placeholder en caso de error.
 *
 * @example
 * <DetailImage uri="https://ejemplo.com/imagen.jpg" placeholder="Sin imagen" />
 */
export const DetailImage: React.FC<DetailImageProps> = ({
  uri,
  placeholder,
}) => {
  const [imgError, setImgError] = useState(false);

  return imgError ? (
    <View style={[styles.image, styles.placeholder]}>
      <Text style={styles.placeholderText} numberOfLines={3}>
        {placeholder}
      </Text>
    </View>
  ) : (
    <Image
      source={{ uri: uri }}
      style={styles.image}
      contentFit="cover"
      cachePolicy="disk"
      transition={300}
      onError={() => setImgError(true)}
    />
  );
};

/**
 * Estilos para el componente DetailImage.
 * @private
 */
const styles = StyleSheet.create({
  image: {
    width: "100%",
    aspectRatio: 2 / 3,
    backgroundColor: "#FFF",
  },
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.grisOscuro,
    padding: 10,
  },
  placeholderText: {
    color: "#FFF",
    fontSize: 14,
    textAlign: "center",
  },
});
