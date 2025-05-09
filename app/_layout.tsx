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
        />
    </View>
);

export default RootLayout;