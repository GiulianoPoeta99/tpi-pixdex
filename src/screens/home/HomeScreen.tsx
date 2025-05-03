import { Colors } from "@/src/constants/Colors";
import { StyleSheet, View } from "react-native";
import { HomeHeader } from "./components/HomeHeader";

export const HomeScreen = () => {
  return (
    <View style={styles.screenContainer}>
        <HomeHeader/>
    </View>
  );
}

const styles = StyleSheet.create({
    screenContainer: { flex: 1, backgroundColor: Colors.fondo},
});