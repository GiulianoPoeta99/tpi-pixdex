import { AuthProvider, useAuth } from '@/src/shared/context/AuthContext';
import { DataProvider } from '@/src/shared/context/DataContext';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

/**
 * Componente que maneja la navegación basada en el estado de autenticación.
 * Redirige a los usuarios no autenticados a la pantalla de login.
 *
 * @component
 * @returns {JSX.Element} Navegación con protección de rutas.
 *
 * @example
 * <ProtectedNavigation />
 */
const ProtectedNavigation = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      // Usuario no autenticado, redirigir a login
      router.replace('/auth/login' as any);
    }
  }, [user, loading, router]);

  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          headerBackButtonDisplayMode: 'minimal',
          headerTitleAlign: 'center',
        }}
      />
    </View>
  );
};

/**
 * Layout raíz de la aplicación. Envuelve toda la app con los proveedores de contexto
 * y configura la navegación principal con protección de rutas.
 *
 * @component
 * @returns {JSX.Element} Layout raíz con navegación y contextos de datos y autenticación.
 *
 * @example
 * <RootLayout />
 */
const RootLayout = () => (
  <AuthProvider>
    <DataProvider>
      <ProtectedNavigation />
    </DataProvider>
  </AuthProvider>
);

export default RootLayout;
