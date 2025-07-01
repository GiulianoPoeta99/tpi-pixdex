import { TextProps, Text } from 'react-native';
import { useFonts } from 'expo-font';

/**
 * Componente de texto que utiliza la fuente PressStart2P.
 * Si la fuente no está cargada, muestra el texto con el estilo por defecto.
 *
 * @component
 * @param {TextProps} props - Propiedades estándar de un componente Text de React Native.
 * @returns {JSX.Element} Texto renderizado con la fuente PressStart2P o fuente por defecto si no está cargada.
 *
 * @example
 * <TextPressStart2P style={{ fontSize: 20 }}>Hola Mundo</TextPressStart2P>
 */
export function TextPressStart2P({ style, ...props }: TextProps) {
  const [loaded, error] = useFonts({
    'PressStart2P-Regular': require('@/assets/fonts/PressStart2P-Regular.ttf'),
  });

  if (!loaded && !error) {
    return (
      <Text style={style} {...props}>
        {props.children}
      </Text>
    );
  }

  return (
    <Text style={[style, { fontFamily: 'PressStart2P-Regular' }]} {...props}>
      {props.children}
    </Text>
  );
}
