import { Button, ButtonVariant } from '@/src/shared/components/Button';
import { TextPressStart2P } from '@/src/shared/components/TextPressStart2P';
import { Colors } from '@/src/shared/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

/**
 * Propiedades para el componente LogoutConfirmModal.
 * @interface
 * @property {boolean} visible - Indica si el modal está visible.
 * @property {() => void} onClose - Función para cerrar el modal.
 * @property {() => void} onConfirm - Función que se ejecuta al confirmar el logout.
 */
interface LogoutConfirmModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

/**
 * Modal de confirmación para cerrar sesión.
 * Muestra un mensaje de confirmación con botones para cancelar o confirmar el logout.
 *
 * @component
 * @param {LogoutConfirmModalProps} props - Propiedades del componente.
 * @param {boolean} props.visible - Indica si el modal está visible.
 * @param {() => void} props.onClose - Función para cerrar el modal.
 * @param {() => void} props.onConfirm - Función que se ejecuta al confirmar el logout.
 * @returns {JSX.Element} Modal de confirmación de logout.
 *
 * @example
 * <LogoutConfirmModal
 *   visible={true}
 *   onClose={() => {}}
 *   onConfirm={() => {}}
 * />
 */
export const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <TextPressStart2P style={styles.modalTitle}>
              Confirmar Cierre de Sesión
            </TextPressStart2P>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name='close' size={24} color='white' />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <MaterialIcons
              name='logout'
              size={48}
              color={Colors.rojo}
              style={styles.icon}
            />
            <TextPressStart2P style={styles.message}>
              ¿Estás seguro de que quieres cerrar sesión?
            </TextPressStart2P>
            <TextPressStart2P style={styles.subMessage}>
              Tendrás que volver a iniciar sesión para acceder a tu cuenta.
            </TextPressStart2P>
          </View>

          <View style={styles.footer}>
            <Button
              onPress={onClose}
              text='CANCELAR'
              icon='cancel'
              variant={ButtonVariant.RED}
              style={styles.cancelButton}
            />
            <Button
              onPress={onConfirm}
              text='CONFIRMAR'
              icon='logout'
              variant={ButtonVariant.GREEN}
              style={styles.confirmButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

/**
 * Estilos para el componente LogoutConfirmModal.
 * @private
 */
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalView: {
    backgroundColor: Colors.fondo,
    borderRadius: 0,
    padding: 20,
    width: Platform.OS === 'web' ? 400 : '90%',
    borderWidth: 2,
    borderColor: Colors.grisOscuro,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: Platform.OS === 'web' ? 20 : 10,
    color: '#FFF',
  },
  content: {
    alignItems: 'center',
    marginBottom: 30,
  },
  icon: {
    marginBottom: 15,
  },
  message: {
    fontSize: Platform.OS === 'web' ? 16 : 14,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 20,
  },
  subMessage: {
    fontSize: Platform.OS === 'web' ? 12 : 10,
    color: Colors.gris,
    textAlign: 'center',
    lineHeight: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  cancelButton: {
    flex: 1,
  },
  confirmButton: {
    flex: 1,
  },
});
