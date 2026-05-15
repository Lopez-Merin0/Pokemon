import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getPokemonDetail } from "../services/pokemonService";
import { pokemonTypeColors } from "../utils/pokemonColors";

export default function DetailScreen() {
    const route = useRoute<any>();

    const { pokemonName } = route.params;

    const [pokemon, setPokemon] =
        useState<any>(null);

    const [activeTab, setActiveTab] =
        useState("about");

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
            <View style={styles.loadingContainer}>
                <Text>Cargando...</Text>
            </View>
        );
    }

    const mainType =
        pokemon.types[0].type.name;

    const backgroundColor =
        pokemonTypeColors[mainType] || "#777";

    return (
        <View
            style={[
                styles.container,
                { backgroundColor },
            ]}
        >
            <Image
                source={{ uri: pokemon.sprites.front_default, }}
                style={styles.image}
            />

            <View style={styles.bottomCard}>
                <Text style={styles.number}>
                    #{pokemon.id}
                </Text>

                <Text style={styles.name}>
                    {pokemon.name}
                </Text>

                <Text style={styles.type}>
                    {pokemon.types.map((type: any) => type.type.name).join(" • ")}
                </Text>

                <View style={styles.tabsContainer}>
                    <TouchableOpacity onPress={() => setActiveTab("about")}>
                        <Text style={[styles.tabText, activeTab === "about" && styles.activeTab,]}>
                            About
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setActiveTab("stats")}>
                        <Text style={[styles.tabText, activeTab === "stats" && styles.activeTab,]}>
                            Stats
                        </Text>
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} >
                    {activeTab === "about" && (
                        <>
                            <View style={styles.infoRow}>
                                <Text style={styles.label}>
                                    Weight
                                </Text>

                                <Text style={styles.value}>
                                    {pokemon.weight}
                                </Text>
                            </View>

                            <View style={styles.infoRow}>
                                <Text style={styles.label}>
                                    Height
                                </Text>

                                <Text style={styles.value}>
                                    {pokemon.height}
                                </Text>
                            </View>

                            <View style={styles.infoRow}>
                                <Text style={styles.label}>
                                    Abilities
                                </Text>

                                <Text style={styles.value}>
                                    {pokemon.abilities.map((ability: any) => ability.ability.name).join(", ")}
                                </Text>
                            </View>
                        </>
                    )}

                    {activeTab === "stats" && (
                        <>
                            {pokemon.stats.map((stat: any) => {
                                const statPercentage = (stat.base_stat / 150) * 100;

                                return (
                                    <View key={stat.stat.name} style={styles.statContainer}>
                                        <View style={styles.statHeader}>
                                            <Text style={styles.statName}>
                                                {stat.stat.name}
                                            </Text>

                                            <Text style={styles.statValue}>
                                                {stat.base_stat}
                                            </Text>
                                        </View>

                                        <View style={styles.barBackground}>
                                            <View style={[styles.barFill, { width: `${statPercentage}%`, backgroundColor, },]} />
                                        </View>
                                    </View>
                                );
                            }
                            )}
                        </>
                    )}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 50,
    },

    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    number: {
        fontSize: 22,
        color: "#5A4E4E",
        fontWeight: "700",
        marginTop: 10,
        textAlign: "center",
    },

    image: {
        width: 190,
        height: 190,
        resizeMode: "contain",
        zIndex: 10,
    },

    bottomCard: {
        flex: 1,
        width: "100%",
        backgroundColor: "#fffdfd",
        marginTop: -20,
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
        padding: 28,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 10,
    },

    name: {
        fontSize: 34,
        fontWeight: "700",
        textTransform: "capitalize",
        textAlign: "center",
        color: "#5A4E4E",
    },

    type: {
        fontSize: 18,
        textAlign: "center",
        color: "#777",
        marginBottom: 25,
        textTransform: "capitalize",
    },

    tabsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 40,
        marginBottom: 30,
    },

    tabText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#B8AFAF",
        paddingBottom: 8,
    },

    activeTab: {
        color: "#7A5C61",
        borderBottomWidth: 3,
        borderBottomColor: "#F8BBD0",
    },

    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },

    label: {
        fontSize: 17,
        color: "#666",
        fontWeight: "600",
    },

    value: {
        fontSize: 17,
        color: "#222",
        fontWeight: "700",
        textTransform: "capitalize",
        maxWidth: "60%",
        textAlign: "right",
    },

    statContainer: {
        marginBottom: 20,
    },

    statHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },

    statName: {
        fontSize: 16,
        fontWeight: "600",
        textTransform: "capitalize",
        color: "#555",
    },

    statValue: {
        fontSize: 16,
        fontWeight: "700",
        color: "#222",
    },

    barBackground: {
        width: "100%",
        height: 12,
        backgroundColor: "#F5EDED",
        borderRadius: 20,
        overflow: "hidden",
    },

    barFill: {
        height: 12,
        borderRadius: 20,
    },
});