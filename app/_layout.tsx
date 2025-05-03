import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';


const RootLayout = () => (
  <SafeAreaView style={{ flex: 1}}>
    <Stack
      screenOptions={{
        headerShown: false,
        headerBackButtonDisplayMode: "minimal",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="detail/[audioVisualId]" options={{ headerShown: false }} />
    </Stack>
  </SafeAreaView>
);

export default RootLayout;