import {
    View,
    Text,
    StyleSheet,
} from "react-native";

export default function FavoritesScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Favorites
            </Text>

            <Text style={styles.text}>
                Aquí aparecerán tus Pokémon favoritos
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF6FB",
        padding: 20,
    },

    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#7A5C61",
    },

    text: {
        fontSize: 16,
        color: "#999",
        textAlign: "center",
    },
});