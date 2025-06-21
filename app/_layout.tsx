import { Stack } from 'expo-router';
import { View } from 'react-native';
import { DataProvider } from '@/src/shared/context/DataContext';

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