import { Button } from '@/src/shared/components/Button';
import { TextPressStart2P } from '@/src/shared/components/TextPressStart2P';
import { Colors } from '@/src/shared/constants/Colors';
import { useAuth } from '@/src/shared/context/AuthContext';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Estados del formulario de registro.
 * @interface
 * @property {string} email - Email del usuario.
 * @property {string} password - Contraseña del usuario.
 * @property {string} confirmPassword - Confirmación de contraseña.
 */
interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

/**
 * Pantalla de registro de usuarios.
 * Permite registro con email/contraseña y proveedores OAuth (Google, GitHub).
 *
 * @component
 * @returns {JSX.Element} Pantalla de registro.
 *
 * @example
 * <RegisterScreen />
 */
export const RegisterScreen = () => {
  const router = useRouter();
  const { signUp, signInWithOAuth, loading, error } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  /**
   * Maneja el cambio en los campos del formulario.
   * @param {string} field - Campo que cambió.
   * @param {string} value - Nuevo valor del campo.
   */
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  /**
   * Valida los datos del formulario antes de enviar.
   * @returns {boolean} True si los datos son válidos.
   */
  const validateForm = (): boolean => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos requeridos.');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return false;
    }

    if (formData.password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Error', 'Por favor ingresa un email válido.');
      return false;
    }

    return true;
  };

  /**
   * Maneja el envío del formulario de registro.
   */
  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await signUp(formData.email, formData.password);
      // Navegar a la pantalla principal después de registro exitoso
      router.replace('/');
    } catch (error) {
      // El error ya se maneja en el contexto de autenticación
      console.error('Error en registro:', error);
    }
  };

  /**
   * Maneja el registro con proveedor OAuth.
   * @param {'google' | 'github'} provider - Proveedor OAuth.
   */
  const handleOAuthRegister = async (provider: 'google' | 'github') => {
    try {
      await signInWithOAuth(provider);
      // La navegación se manejará automáticamente cuando se complete la autenticación
    } catch (error) {
      console.error(`Error en registro con ${provider}:`, error);
    }
  };

  /**
   * Navega a la pantalla de login.
   */
  const goToLogin = () => {
    router.push('/auth/login' as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <TextPressStart2P style={styles.title}>
            Registrarse
          </TextPressStart2P>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={value => handleInputChange('email', value)}
                placeholder='tu@email.com'
                placeholderTextColor={Colors.gris}
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Contraseña</Text>
              <TextInput
                style={styles.input}
                value={formData.password}
                onChangeText={value => handleInputChange('password', value)}
                placeholder='••••••••'
                placeholderTextColor={Colors.gris}
                secureTextEntry
                autoCapitalize='none'
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirmar Contraseña</Text>
              <TextInput
                style={styles.input}
                value={formData.confirmPassword}
                onChangeText={value =>
                  handleInputChange('confirmPassword', value)
                }
                placeholder='••••••••'
                placeholderTextColor={Colors.gris}
                secureTextEntry
                autoCapitalize='none'
              />
            </View>

            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <Button
              onPress={handleSubmit}
              text='REGISTRARSE'
              disabled={loading}
              textStyle={{ fontSize: Platform.OS === 'web' ? 16 : 12 }}
            />

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>O</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.oauthContainer}>
              <Button
                onPress={() => handleOAuthRegister('google')}
                icon='public'
                text='GOOGLE'
                disabled={loading}
                textStyle={{ fontSize: Platform.OS === 'web' ? 14 : 10 }}
              />
              <Button
                onPress={() => handleOAuthRegister('github')}
                icon='code'
                text='GITHUB'
                disabled={loading}
                textStyle={{ fontSize: Platform.OS === 'web' ? 14 : 10 }}
              />
            </View>

            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>
                ¿Ya tienes cuenta?
              </Text>
              <Text style={styles.switchLink} onPress={goToLogin}>
                Inicia sesión
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Estilos para la pantalla RegisterScreen.
 * @private
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fondo,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    padding: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: Colors.purpura,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 40,
  },
  form: {
    width: '100%',
    maxWidth: 400,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: Colors.purpura,
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'System',
    fontWeight: '600',
  },
  input: {
    borderWidth: 2,
    borderColor: Colors.purpura,
    padding: 15,
    color: '#FFF',
    fontSize: 16,
    marginBottom: 10,
  },
  errorContainer: {
    backgroundColor: Colors.rojo + '20',
    borderWidth: 1,
    borderColor: Colors.rojo,
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  errorText: {
    color: Colors.rojo,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'System',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.gris,
  },
  dividerText: {
    color: Colors.gris,
    fontSize: 16,
    marginHorizontal: 15,
    fontFamily: 'System',
  },
  oauthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
    marginBottom: 30,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  switchText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'System',
  },
  switchLink: {
    color: Colors.verde,
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
}); 