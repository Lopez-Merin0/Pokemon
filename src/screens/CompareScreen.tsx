import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Modal,
    FlatList,
    TextInput,
    ScrollView,
} from "react-native";

import {
    useEffect,
    useState,
} from "react";

import {
    getPokemonDetail,
    getPokemons,
} from "../services/pokemonService";

import {
    pokemonTypeColors,
} from "../utils/pokemonColors";

export default function CompareScreen() {

    const [pokemon1Name,
        setPokemon1Name] =
        useState("");

    const [pokemon2Name,
        setPokemon2Name] =
        useState("");

    const [pokemon1,
        setPokemon1] =
        useState<any>(null);

    const [pokemon2,
        setPokemon2] =
        useState<any>(null);

    const [allPokemons,
        setAllPokemons] =
        useState<any[]>([]);

    const [showSelector,
        setShowSelector] =
        useState(false);

    const [selectedInput,
        setSelectedInput] =
        useState("");

    const [search,
        setSearch] =
        useState("");

    useEffect(() => {

        if (pokemon1Name) {
            loadPokemon1();
        }

    }, [pokemon1Name]);

    useEffect(() => {

        if (pokemon2Name) {
            loadPokemon2();
        }

    }, [pokemon2Name]);

    useEffect(() => {
        loadAllPokemons();
    }, []);

    const loadPokemon1 =
        async () => {

            try {

                const data =
                    await getPokemonDetail(
                        pokemon1Name
                    );

                setPokemon1(data);

            } catch (error) {
                console.log(error);
            }
        };

    const loadPokemon2 =
        async () => {

            try {

                const data =
                    await getPokemonDetail(
                        pokemon2Name
                    );

                setPokemon2(data);

            } catch (error) {
                console.log(error);
            }
        };

    const loadAllPokemons =
        async () => {

            try {

                const data =
                    await getPokemons();

                setAllPokemons(data);

            } catch (error) {
                console.log(error);
            }
        };

    const openSelector =
        (side: string) => {

            setSelectedInput(side);

            setShowSelector(true);
        };

    const getTotalStats =
        (pokemon: any) => {

            if (!pokemon) {
                return 0;
            }

            return pokemon.stats.reduce(
                (total: number,
                    stat: any) =>
                    total + stat.base_stat,
                0
            );
        };

    const getWinner =
        () => {

            if (!pokemon1 || !pokemon2) {
                return null;
            }

            const total1 =
                getTotalStats(
                    pokemon1
                );

            const total2 =
                getTotalStats(
                    pokemon2
                );

            if (total1 > total2) {
                return pokemon1;
            }

            if (total2 > total1) {
                return pokemon2;
            }

            return "draw";
        };

    const winner =
        getWinner();

    const resetComparison =
        () => {

            setPokemon1Name("");
            setPokemon2Name("");
            setPokemon1(null);
            setPokemon2(null);
            setSearch("");
            setShowSelector(false);
            setSelectedInput("");
        };

    const renderPokemonCard =
        (
            pokemon: any,
            side: string
        ) => {

            if (!pokemon) {

                return (

                    <TouchableOpacity
                        style={styles.emptyCard}
                        onPress={() =>
                            openSelector(side)
                        }
                    >

                        <Text style={styles.plus}>
                            +
                        </Text>

                        <Text style={styles.emptyText}>
                            Select Pokémon
                        </Text>

                    </TouchableOpacity>
                );
            }

            const mainType =
                pokemon.types[0].type.name;

            const backgroundColor =
                pokemonTypeColors[
                mainType
                ] || "#999";

            return (

                <View
                    style={[
                        styles.pokemonCard,
                        {
                            backgroundColor,
                        },
                    ]}
                >

                    <TouchableOpacity
                        style={styles.changeButton}
                        onPress={() =>
                            openSelector(side)
                        }
                    >

                        <Text style={styles.changeButtonText}>
                            Change
                        </Text>

                    </TouchableOpacity>

                    <Image
                        source={{
                            uri:
                                pokemon
                                    .sprites
                                    .versions[
                                    "generation-v"
                                ]["black-white"]
                                    .animated
                                    .front_default ||
                                pokemon
                                    .sprites
                                    .front_default,
                        }}
                        style={styles.image}
                    />

                    <View style={styles.bottomCard}>

                        <Text style={styles.number}>
                            #{pokemon.id}
                        </Text>

                        <Text style={styles.name}>
                            {pokemon.name}
                        </Text>

                        <View style={styles.typesContainer}>

                            {pokemon.types.map(
                                (type: any) => (

                                    <View
                                        key={
                                            type.type.name
                                        }
                                        style={[
                                            styles.typeBadge,
                                            {
                                                backgroundColor:
                                                    pokemonTypeColors[
                                                    type.type.name
                                                    ],
                                            },
                                        ]}
                                    >

                                        <Text
                                            style={
                                                styles.typeText
                                            }
                                        >
                                            {
                                                type.type.name
                                            }
                                        </Text>

                                    </View>
                                )
                            )}

                        </View>

                        <View style={styles.infoRow}>

                            <Text style={styles.infoLabel}>
                                HP
                            </Text>

                            <Text style={styles.infoValue}>
                                {pokemon.stats?.[0]
                                    ?.base_stat}
                            </Text>

                        </View>

                        <View style={styles.infoRow}>

                            <Text style={styles.infoLabel}>
                                Attack
                            </Text>

                            <Text style={styles.infoValue}>
                                {pokemon.stats?.[1]
                                    ?.base_stat}
                            </Text>

                        </View>

                        <View style={styles.infoRow}>

                            <Text style={styles.infoLabel}>
                                Defense
                            </Text>

                            <Text style={styles.infoValue}>
                                {pokemon.stats?.[2]
                                    ?.base_stat}
                            </Text>

                        </View>

                        <View style={styles.infoRow}>

                            <Text style={styles.infoLabel}>
                                Speed
                            </Text>

                            <Text style={styles.infoValue}>
                                {pokemon.stats?.[5]
                                    ?.base_stat}
                            </Text>

                        </View>

                        <View style={styles.infoRow}>

                            <Text style={styles.infoLabel}>
                                Height
                            </Text>

                            <Text style={styles.infoValue}>
                                {pokemon.height}
                            </Text>

                        </View>

                        <View style={styles.infoRow}>

                            <Text style={styles.infoLabel}>
                                Weight
                            </Text>

                            <Text style={styles.infoValue}>
                                {pokemon.weight}
                            </Text>

                        </View>

                    </View>

                </View>
            );
        };

    return (

        <View style={styles.container}>

            <Text style={styles.title}>
                VS
            </Text>

            <ScrollView
                showsVerticalScrollIndicator={
                    false
                }
                contentContainerStyle={
                    styles.scrollContent
                }
            >

                <View style={styles.topSection}>

                    {renderPokemonCard(
                        pokemon1,
                        "pokemon1"
                    )}

                    {renderPokemonCard(
                        pokemon2,
                        "pokemon2"
                    )}

                </View>

                {pokemon1 && pokemon2 && winner !== "draw" && (

                    <View style={styles.winnerSection}>

                        <View style={styles.winnerCard}>

                            <Text style={styles.winnerTitle}>
                                Winner
                            </Text>

                            <View style={styles.winnerContent}>

                                <Image
                                    source={{
                                        uri:
                                            winner
                                                .sprites
                                                .versions[
                                                "generation-v"
                                            ]["black-white"]
                                                .animated
                                                .front_default ||
                                            winner
                                                .sprites
                                                .front_default,
                                    }}
                                    style={styles.winnerImage}
                                />

                                <View style={styles.winnerInfo}>

                                    <Text style={styles.winnerText}>
                                        {winner.name}
                                    </Text>

                                    <Text style={styles.winnerStats}>
                                        Total Stats:
                                        {" "}
                                        {getTotalStats(
                                            winner
                                        )}
                                    </Text>

                                </View>

                            </View>

                        </View>

                        <TouchableOpacity
                            style={styles.resetButton}
                            onPress={resetComparison}
                        >

                            <Text style={styles.resetButtonText}>
                                Reset
                            </Text>

                        </TouchableOpacity>

                    </View>
                )}

            </ScrollView>

            <Modal
                visible={showSelector}
                animationType="slide"
            >

                <View style={styles.modalContainer}>

                    <Text style={styles.modalTitle}>
                        Select Pokémon
                    </Text>

                    <View style={styles.searchContainer}>

                        <TextInput
                            placeholder="Search Pokémon..."
                            placeholderTextColor="#B999A8"
                            style={styles.searchInput}
                            value={search}
                            onChangeText={setSearch}
                        />

                    </View>

                    <FlatList
                        data={
                            allPokemons.filter(
                                (pokemon) =>
                                    pokemon.name
                                        .toLowerCase()
                                        .includes(
                                            search.toLowerCase()
                                        )
                            )
                        }
                        keyExtractor={(item) => item.name}
                        numColumns={3}
                        columnWrapperStyle={styles.row}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {

                            const pokemonId =
                                item.url.split("/")[6];

                            const imageUrl =
                                `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

                            return (

                                <TouchableOpacity
                                    style={styles.selectorCard}
                                    onPress={() => {

                                        if (
                                            selectedInput ===
                                            "pokemon1"
                                        ) {

                                            setPokemon1Name(
                                                item.name
                                            );

                                        } else {

                                            setPokemon2Name(
                                                item.name
                                            );
                                        }

                                        setShowSelector(false);
                                    }}
                                >

                                    <Image
                                        source={{
                                            uri: imageUrl,
                                        }}
                                        style={styles.selectorImage}
                                    />

                                    <Text style={styles.selectorName}>
                                        {item.name}
                                    </Text>

                                    <Text style={styles.selectorNumber}>
                                        #{pokemonId}
                                    </Text>

                                </TouchableOpacity>
                            );
                        }}
                    />

                </View>

            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#FFF0F7",
        paddingTop: 55,
        paddingHorizontal: 12,
    },

    scrollContent: {
        paddingBottom: 60,
    },

    title: {
        fontSize: 32,
        fontWeight: "700",
        color: "#A35C7A",
        textAlign: "center",
        marginBottom: 25,
    },

    topSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 18,
    },

    pokemonCard: {
        width: "48%",
        borderRadius: 35,
        paddingTop: 18,
        alignItems: "center",
    },

    bottomCard: {
        width: "100%",
        backgroundColor: "#fffdfd",
        marginTop: -10,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        padding: 18,
        height: 280,
    },

    emptyCard: {
        width: "48%",
        height: 470,
        backgroundColor: "#FFFFFF",
        borderRadius: 35,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#FFD0E4",
    },

    plus: {
        fontSize: 70,
        color: "#FFB6D5",
        fontWeight: "300",
    },

    emptyText: {
        marginTop: 8,
        color: "#A35C7A",
        fontWeight: "600",
        textAlign: "center",
    },

    image: {
        width: 120,
        height: 120,
        resizeMode: "contain",
        zIndex: 10,
    },

    number: {
        fontSize: 16,
        color: "#B57A93",
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 5,
    },

    name: {
        fontSize: 18,
        fontWeight: "700",
        color: "#5A4E4E",
        textTransform: "capitalize",
        textAlign: "center",
    },

    typesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 5,
        marginTop: 10,
        marginBottom: 18,
    },

    typeBadge: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
    },

    typeText: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "700",
        textTransform: "capitalize",
    },

    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },

    infoLabel: {
        fontSize: 13,
        color: "#777",
        fontWeight: "600",
    },

    infoValue: {
        fontSize: 13,
        color: "#333",
        fontWeight: "700",
    },

    changeButton: {
        backgroundColor: "#FFFFFF",
        paddingVertical: 7,
        paddingHorizontal: 14,
        borderRadius: 18,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: "#FFD0E4",
    },

    changeButtonText: {
        color: "#A35C7A",
        fontWeight: "700",
        fontSize: 12,
    },

    winnerCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 28,
        paddingVertical: 18,
        paddingHorizontal: 14,
        alignItems: "center",
        alignSelf: "center",
        width: "92%",
        marginBottom: 26,
        borderWidth: 2,
        borderColor: "#FFD0E4",
    },

    winnerSection: {
        width: "100%",
        marginBottom: 26,
    },

    winnerContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        gap: 10,
    },

    winnerTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#A35C7A",
        marginBottom: 10,
    },

    winnerImage: {
        width: 92,
        height: 92,
        resizeMode: "contain",
    },

    winnerInfo: {
        flex: 1,
        alignItems: "flex-start",
    },

    winnerText: {
        fontSize: 17,
        fontWeight: "700",
        color: "#5A4E4E",
        textTransform: "capitalize",
        marginBottom: 4,
        textAlign: "left",
    },

    winnerStats: {
        fontSize: 12,
        color: "#9B7E89",
        fontWeight: "700",
        textAlign: "left",
    },

    resetButton: {
        alignSelf: "flex-end",
        marginTop: -20,
        backgroundColor: "#FFFFFF",
        borderWidth: 2,
        borderColor: "#FFD0E4",
        borderRadius: 16,
        paddingVertical: 7,
        paddingHorizontal: 14,
    },

    resetButtonText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#A35C7A",
        textTransform: "uppercase",
    },

    modalContainer: {
        flex: 1,
        backgroundColor: "#FFF0F7",
        paddingTop: 60,
        paddingHorizontal: 20,
    },

    modalTitle: {
        fontSize: 28,
        fontWeight: "700",
        color: "#A35C7A",
        marginBottom: 20,
        textAlign: "center",
    },

    searchContainer: {
        marginBottom: 20,
    },

    searchInput: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        paddingVertical: 14,
        paddingHorizontal: 18,
        borderWidth: 2,
        borderColor: "#FFD0E4",
        fontSize: 16,
        color: "#6B4F5B",
    },

    row: {
        justifyContent: "space-between",
    },

    selectorCard: {
        width: "31%",
        backgroundColor: "#FFD9EC",
        borderRadius: 22,
        paddingVertical: 14,
        marginBottom: 18,
        alignItems: "center",
    },

    selectorImage: {
        width: 60,
        height: 60,
        resizeMode: "contain",
        marginBottom: 6,
    },

    selectorName: {
        fontSize: 12,
        fontWeight: "700",
        color: "#6B4F5B",
        textTransform: "capitalize",
        textAlign: "center",
    },

    selectorNumber: {
        fontSize: 10,
        color: "#9B7E89",
        marginTop: 4,
        fontWeight: "600",
    },
});