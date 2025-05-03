import { TextProps, Text } from "react-native";
import { useFonts } from "expo-font";

export function TextPressStart2P({ style, ...props }: TextProps) {
  const [loaded, error] = useFonts({
    "PressStart2P-Regular": require("@/assets/fonts/PressStart2P-Regular.ttf"),
  });

  if (!loaded && !error) {
    return (
      <Text style={style} {...props}>
        {props.children}
      </Text>
    );
  }

  return (
    <Text style={[style, { fontFamily: "PressStart2P-Regular" }]} {...props}>
      {props.children}
    </Text>
  );
}
