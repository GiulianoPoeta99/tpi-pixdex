import { Stack } from 'expo-router';
import { View } from 'react-native';


const RootLayout = () => (
    <View style={{ flex: 1 }}>
        <Stack
            screenOptions={{
                headerShown: false,
                headerBackButtonDisplayMode: "minimal",
                headerTitleAlign: "center",
            }}
        >
            {/* <Stack.Screen name="detail/[audioVisualId]" options={{ headerShown: false }} />
            <Stack.Screen name="hang-man" options={{ headerShown: false }} />
            <Stack.Screen name="pixel-reveal" options={{ headerShown: false }} /> */}
        </Stack>
    </View>
);

export default RootLayout;