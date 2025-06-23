import { Stack } from "expo-router";
import { View } from "react-native";
import { DataProvider } from "@/src/shared/context/DataContext";

/**
 * Layout raíz de la aplicación. Envuelve toda la app con el DataProvider y configura la navegación principal.
 *
 * @component
 * @returns {JSX.Element} Layout raíz con navegación y contexto de datos.
 *
 * @example
 * <RootLayout />
 */
const RootLayout = () => (
  <DataProvider>
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          headerBackButtonDisplayMode: "minimal",
          headerTitleAlign: "center",
        }}
      />
    </View>
  </DataProvider>
);

export default RootLayout;
