import { View, Text, StyleSheet, Image, } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getPokemonDetail } from "../services/pokemonService";

export default function DetailScreen() {
    const route = useRoute<any>();

    const { pokemonName } = route.params;

    const [pokemon, setPokemon] =
        useState<any>(null);

    useEffect(() => {
        loadPokemonDetail();
    }, []);

    const loadPokemonDetail = async () => {
        try {
            const data =
                await getPokemonDetail(
                    pokemonName
                );

            setPokemon(data);
        } catch (error) {
            console.log(error);
        }
    };

    if (!pokemon) {
        return (
            <View style={styles.container}>
                <Text>Cargando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.name}>
                {pokemon.name}
            </Text>

            <Image
                source={{ uri: pokemon.sprites.front_default, }}
                style={styles.image}
            />

            <Text style={styles.info}>
                Type: {pokemon.types.map((type: any) => type.type.name).join(", ")}
            </Text>

            <Text style={styles.info}>
                Weight: {pokemon.weight}
            </Text>

            <Text style={styles.info}>
                Height: {pokemon.height}
            </Text>

            <Text style={styles.info}>
                Ability: {pokemon.abilities.map((ability: any) => ability.ability.name).join(", ")}
            </Text>

            <Text style={styles.sectionTitle}>
                Statistics
            </Text>

                {pokemon.stats.map(
                    (stat: any) => (
                        <Text
                            key={stat.stat.name}
                            style={styles.info}
                        >
                            {stat.stat.name}:{" "}
                            {stat.base_stat}
                        </Text>
                    )
                )}
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