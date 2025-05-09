import { TextPressStart2P } from "@/src/shared/components/TextPressStart2P"
import { Colors } from "@/src/shared/constants/Colors";
import { Href, useRouter } from "expo-router"
import { Platform, StyleProp, StyleSheet, ViewStyle, Text, View, TouchableOpacity } from "react-native"

interface GameButtonProps {
    title: string;
    description: string;
    buttonColor: StyleProp<ViewStyle>
    url: Href;
}

export const GameButton: React.FC<GameButtonProps> = ({ title, description, buttonColor, url }) => {
    const router = useRouter();

    const handlePress = () => {
        router.push(url);
    };

    return (
        <TouchableOpacity
            style={[styles.container, buttonColor]}
            activeOpacity={0.7}
            onPress={handlePress}
        >
            <View style={styles.section}>
                <TextPressStart2P style={styles.title}>{title}</TextPressStart2P>
            </View>

            <View style={styles.section}>
                <Text style={styles.description}>{description}</Text>
            </View>

            <View style={[styles.section, styles.playSection]}>
                <TextPressStart2P style={styles.play}>Jugar</TextPressStart2P>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: Colors.gris,
        padding: 20,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    section: {
        width: '100%',
        marginVertical: Platform.OS === "web" ? 10 : 2,
    },
    playSection: {
        // TODO: hay que hacer que se vaya hacia abajo
        alignItems: 'flex-end',
    },
    title: {
        color: '#FFF',
        fontSize: Platform.OS === "web" ? 36 : 12,
        // fontWeight: 'bold', // esto en android no anda
    },
    description: {
        color: '#FFF',
        fontSize: Platform.OS === "web" ? 20 : 10,
    },
    play: {
        color: '#FFF',
        fontSize: Platform.OS === "web" ? 12 : 7,
        // fontWeight: 'bold',
    }
})