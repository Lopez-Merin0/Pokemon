import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { getPokemons, getPokemonTypes, getPokemonsByType, } from "../services/pokemonService";
import { getFavorites, saveFavorite, removeFavorite, } from "../storage/favoritesStorage";

export default function HomeScreen() {

    const navigation = useNavigation<any>();
    const [pokemons, setPokemons] = useState<any[]>([]);
    const [filteredPokemons, setFilteredPokemons] = useState<any[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [search, setSearch] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [types, setTypes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { loadPokemons(); loadFavorites(); loadTypes(); }, []);

    useEffect(() => { applyFilters(); }, [search, selectedType, pokemons]);

    const loadPokemons = async () => {
        try {
            setLoading(true);
            const data = await getPokemons();
            setPokemons(data);

        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);
        }
    };

    const loadFavorites =
        async () => {
            const favoritesData = await getFavorites();
            const favoriteNames = favoritesData.map((fav: any) => fav.name);
            setFavorites(favoriteNames);
        };

    const loadTypes =
        async () => {
            const data = await getPokemonTypes();
            setTypes(data);
        };

    const toggleFavorite =
        async (pokemon: any) => {
            const isFavorite = favorites.includes(pokemon.name);

            if (isFavorite) {

                await removeFavorite(pokemon.name);
                setFavorites(favorites.filter((name) => name !== pokemon.name));

            } else {

                await saveFavorite(pokemon);
                setFavorites([...favorites, pokemon.name,]);
            }
        };

    const handleSearch = (text: string) => { setSearch(text); };

    const applyFilters =
        async () => {
            let filtered = [...pokemons];

            if (selectedType !== "") {

                const data = await getPokemonsByType(selectedType);
                const typePokemons = data.map((item: any) => item.pokemon.name);
                filtered = filtered.filter((pokemon) => typePokemons.includes(pokemon.name));
            }

            if (search !== "") {
                filtered = filtered.filter((pokemon) => pokemon.name.toLowerCase().includes
                    (search.toLowerCase()));
            }

            setFilteredPokemons(filtered);
        };

    if (loading) {

        return (
            <View style={styles.centerContainer}>
                <Text>
                    Loading Pokémon...
                </Text>
            </View>
        );
    }

    return (

        <View style={styles.container}>

            <Text style={styles.title}>
                Pokédex
            </Text>

            <View style={styles.searchContainer}>

                <TextInput
                    placeholder="Buscar Pokémon..."
                    placeholderTextColor="#B999A8"
                    value={search}
                    onChangeText={handleSearch}
                    style={styles.searchInput}
                />

                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={() =>
                        setShowFilters(
                            !showFilters
                        )
                    }
                >
                    <Ionicons
                        name="options"
                        size={24}
                        color="#A35C7A"
                    />
                </TouchableOpacity>

            </View>

            {showFilters && (

                <View style={styles.dropdown}>

                    <ScrollView nestedScrollEnabled showsVerticalScrollIndicator>

                        <TouchableOpacity
                            style={styles.dropdownItem}
                            onPress={() => {
                                setSelectedType("");
                                setShowFilters(false);
                            }}
                        >
                            <Text style={styles.dropdownText}>
                                All Types
                            </Text>
                        </TouchableOpacity>

                        {types.map((type) => (

                            <TouchableOpacity
                                key={type.name}
                                style={styles.dropdownItem}
                                onPress={() => {
                                    setSelectedType(type.name);
                                    setShowFilters(false);
                                }}
                            >
                                <Text style={styles.dropdownText}>
                                    {type.name}
                                </Text>
                            </TouchableOpacity>

                        ))}

                    </ScrollView>

                </View>
            )}

            {filteredPokemons.length === 0 ? (

                <View style={styles.centerContainer}>
                    <Text style={styles.emptyText}>
                        Could not find any Pokémons
                    </Text>
                </View>

            ) : (

                <FlatList
                    data={filteredPokemons}
                    keyExtractor={(item) => item.name}
                    numColumns={3}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {

                        const pokemonId =
                            item.url.split("/")[6];

                        const imageUrl =
                            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

                        return (

                            <TouchableOpacity
                                style={styles.card}
                                onPress={() =>
                                    navigation.navigate(
                                        "Detail",
                                        { pokemonName: item.name, }
                                    )
                                }
                            >

                                <TouchableOpacity
                                    style={styles.favoriteButton}
                                    onPress={() => toggleFavorite(item)}
                                >
                                    <Ionicons
                                        name={favorites.includes(item.name) ? "heart" : "heart-outline"}
                                        size={18}
                                        color="#FF6FA9"
                                    />
                                </TouchableOpacity>

                                <Image
                                    source={{ uri: imageUrl, }}
                                    style={styles.image}
                                />

                                <Text style={styles.name}>
                                    {item.name}
                                </Text>

                                <Text style={styles.number}>
                                    #{pokemonId}
                                </Text>

                            </TouchableOpacity>
                        );
                    }}
                />
            )}

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: "#FFF0F7",
    },

    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    title: {
        fontSize: 38,
        fontWeight: "bold",
        marginTop: 55,
        marginBottom: 20,
        color: "#A35C7A",
    },

    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },

    searchInput: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingVertical: 14,
        paddingHorizontal: 18,
        borderRadius: 22,
        fontSize: 16,
        borderWidth: 2,
        borderColor: "#FFD0E4",
        color: "#6B4F5B",
    },

    filterButton: {
        width: 55,
        height: 55,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
        borderWidth: 2,
        borderColor: "#FFD0E4",
    },

    dropdown: {
        height: 220,
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: "#FFD0E4",
        overflow: "hidden",
    },

    dropdownItem: {
        paddingVertical: 16,
        paddingHorizontal: 18,
        borderBottomWidth: 1,
        borderBottomColor: "#FFF0F7",
    },

    dropdownText: {
        fontSize: 16,
        color: "#6B4F5B",
        fontWeight: "600",
        textTransform: "capitalize",
    },

    row: {
        justifyContent: "space-between",
    },

    listContent: {
        paddingBottom: 120,
    },

    card: {
        width: "31%",
        backgroundColor: "#FFD9EC",
        borderRadius: 28,
        paddingVertical: 16,
        marginBottom: 18,
        alignItems: "center",
        position: "relative",
    },

    favoriteButton: {
        position: "absolute",
        top: 8,
        right: 8,
        zIndex: 10,
        backgroundColor: "rgba(255,255,255,0.7)",
        borderRadius: 20,
        padding: 4,
    },

    image: {
        width: 70,
        height: 70,
        resizeMode: "contain",
        marginBottom: 8,
    },

    name: {
        fontSize: 13,
        fontWeight: "700",
        textTransform: "capitalize",
        color: "#6B4F5B",
        textAlign: "center",
    },

    number: {
        fontSize: 11,
        color: "#9B7E89",
        marginTop: 4,
        fontWeight: "600",
    },

    emptyText: {
        fontSize: 16,
        color: "#9B7E89",
    },
});