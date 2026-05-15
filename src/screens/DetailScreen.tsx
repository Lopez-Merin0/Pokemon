import { View, Text, StyleSheet, Image, } from "react-native";

export default function DetailScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>
                Pikachu
            </Text>

            <Image
                source={{
                    uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
                }}
                style={styles.image}
            />

            <Text style={styles.info}>
                Tipo: Eléctrico
            </Text>

            <Text style={styles.info}>
                Peso: 60
            </Text>

            <Text style={styles.info}>
                Altura: 4
            </Text>

            <Text style={styles.info}>
                Habilidad: Static
            </Text>

            <Text style={styles.sectionTitle}>
                Estadísticas
            </Text>

            <Text style={styles.info}>
                HP: 35
            </Text>

            <Text style={styles.info}>
                Attack: 55
            </Text>

            <Text style={styles.info}>
                Defense: 40
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
        alignItems: "center",
    },

    name: {
        fontSize: 32,
        fontWeight: "bold",
        textTransform: "capitalize",
        marginTop: 40,
    },

    image: {
        width: 200,
        height: 200,
        marginVertical: 20,
    },

    info: {
        fontSize: 18,
        marginBottom: 10,
    },

    sectionTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
    },
});