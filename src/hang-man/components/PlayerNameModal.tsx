import { Button } from "@/src/shared/components/Button";
import { TextPressStart2P } from "@/src/shared/components/TextPressStart2P";
import { Colors } from "@/src/shared/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import React, { FC, useState } from "react";
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface PlayerNameModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (playerName: string) => void;
  doesPlayerExist: (name: string) => boolean;
}

export const PlayerNameModal: FC<PlayerNameModalProps> = ({
  visible,
  onClose,
  onSubmit,
  doesPlayerExist,
}) => {
  const [playerName, setPlayerName] = useState("");
  const [nameError, setNameError] = useState("");

  const handleStartGame = () => {
    const trimmedName = playerName.trim();

    if (!trimmedName) {
      setNameError("Player name cannot be empty.");
      return;
    }

    if (doesPlayerExist(trimmedName)) {
      setNameError("This player name is already taken.");
      return;
    }
    
    setNameError("");
    onSubmit(trimmedName);
    setPlayerName("");
  };

  const openModal = () => {
    setNameError("");
    setPlayerName("");
  };

  React.useEffect(() => {
    if (visible) openModal();
  }, [visible]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { borderColor: Colors.grisOscuro }]}>
          <View style={styles.modalHeader}>
            <TextPressStart2P style={styles.modalTitle}>
              Enter Your Name
            </TextPressStart2P>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <TextInput
            style={[styles.input, nameError ? styles.inputError : null]}
            placeholder="Player name"
            placeholderTextColor={Colors.gris}
            value={playerName}
            onChangeText={setPlayerName}
          />
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
          <View style={styles.modalFooter}>
            <Button
              onPress={handleStartGame}
              icon="play-arrow"
              text="START GAME"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalView: {
    backgroundColor: Colors.fondo,
    borderRadius: 0,
    padding: 20,
    width: Platform.OS === "web" ? 400 : "90%",
    borderWidth: 2,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: { fontSize: 18, color: "#FFF" },
  input: {
    borderWidth: 2,
    borderColor: Colors.purpura,
    padding: 15,
    color: "#FFF",
    fontSize: 16,
    marginBottom: 10,
  },
  inputError: { borderColor: Colors.rojo },
  errorText: { color: Colors.rojo, marginBottom: 10, fontSize: 12 },
  modalFooter: { flexDirection: "row", justifyContent: "flex-end" },
});
