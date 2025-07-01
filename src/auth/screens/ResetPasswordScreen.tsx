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
 * Pantalla de reset de contraseña.
 * Permite a los usuarios solicitar un email de reset de contraseña.
 *
 * @component
 * @returns {JSX.Element} Pantalla de reset de contraseña.
 *
 * @example
 * <ResetPasswordScreen />
 */
export const ResetPasswordScreen = () => {
  const router = useRouter();
  const { resetPassword, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  /**
   * Valida el email antes de enviar.
   * @returns {boolean} True si el email es válido.
   */
  const validateEmail = (): boolean => {
    if (!email) {
      Alert.alert('Error', 'Por favor ingresa tu email.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Por favor ingresa un email válido.');
      return false;
    }

    return true;
  };

  /**
   * Maneja el envío del formulario de reset de contraseña.
   */
  const handleSubmit = async () => {
    if (!validateEmail()) return;

    try {
      await resetPassword(email);
      setEmailSent(true);
    } catch (error) {
      // El error ya se maneja en el contexto de autenticación
      console.error('Error en reset de contraseña:', error);
    }
  };

  /**
   * Navega de vuelta a la pantalla de login.
   */
  const handleBackToLogin = () => {
    router.push('/auth/login');
  };

  if (emailSent) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.content}>
            <TextPressStart2P style={styles.title}>
              Email Enviado
            </TextPressStart2P>

            <View style={styles.messageContainer}>
              <Text style={styles.messageText}>
                Hemos enviado un enlace de reset de contraseña a:
              </Text>
              <Text style={styles.emailText}>{email}</Text>
              <Text style={styles.messageText}>
                Por favor, revisa tu bandeja de entrada y sigue las
                instrucciones del email.
              </Text>
            </View>

            <Button
              onPress={handleBackToLogin}
              text='VOLVER AL LOGIN'
              textStyle={{ fontSize: Platform.OS === 'web' ? 16 : 12 }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <TextPressStart2P style={styles.title}>
            Reset de Contraseña
          </TextPressStart2P>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder='tu@email.com'
                placeholderTextColor={Colors.gris}
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
              />
            </View>

            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <Button
              onPress={handleSubmit}
              text='ENVIAR EMAIL'
              disabled={loading}
              textStyle={{ fontSize: Platform.OS === 'web' ? 16 : 12 }}
            />

            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>¿Recordaste tu contraseña?</Text>
              <Text style={styles.switchLink} onPress={handleBackToLogin}>
                Volver al login
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Estilos para la pantalla ResetPasswordScreen.
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
  messageContainer: {
    backgroundColor: Colors.verde + '20',
    borderWidth: 1,
    borderColor: Colors.verde,
    borderRadius: 8,
    padding: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  messageText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'System',
    marginBottom: 10,
  },
  emailText: {
    color: Colors.verde,
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: '600',
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginTop: 20,
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
