import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';


export const RootLayout = () => (
  <SafeAreaView style={{ flex: 1}}>
    <Stack
      screenOptions={{
        headerShown: false,
        headerBackButtonDisplayMode: "minimal",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="detail/[audioVisualId]" options={{ headerShown: true }} />
    </Stack>
  </SafeAreaView>
);