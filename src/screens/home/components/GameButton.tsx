import { TextPressStart2P } from "@/src/components/TextPressStart2P"
import { Colors } from "@/src/constants/Colors";
import { Href, useRouter } from "expo-router"
import { StyleProp, StyleSheet, ViewStyle, Text, View, TouchableOpacity } from "react-native"

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
        marginVertical: 10,
    },
    playSection: {
        alignItems: 'flex-end',
    },
    title: {
        color: '#FFF',
        fontSize: 36,
        fontWeight: 'bold',
    },
    description: {
        color: '#FFF',
        fontSize: 20,
    },
    play: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: 'bold',
    }
})