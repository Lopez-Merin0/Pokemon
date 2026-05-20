import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
} from "react-native";

import { useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";

import { getPokemons } from "../services/pokemonService";

import {
    getFavorites,
    saveFavorite,
    removeFavorite,
} from "../storage/favoritesStorage";

export default function HomeScreen() {
    const navigation = useNavigation<any>();

    const [pokemons, setPokemons] =
        useState<any[]>([]);

    const [filteredPokemons, setFilteredPokemons] =
        useState<any[]>([]);

    const [favorites, setFavorites] =
        useState<string[]>([]);

    const [search, setSearch] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        loadPokemons();

        loadFavorites();
    }, []);

    const loadPokemons = async () => {
        try {
            setLoading(true);

            const data =
                await getPokemons();

            setPokemons(data);

            setFilteredPokemons(
                data
            );
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const loadFavorites =
        async () => {
            const favoritesData =
                await getFavorites();

            const favoriteNames =
                favoritesData.map(
                    (fav: any) =>
                        fav.name
                );

            setFavorites(
                favoriteNames
            );
        };

    const toggleFavorite =
        async (pokemon: any) => {
            const isFavorite =
                favorites.includes(
                    pokemon.name
                );

            if (isFavorite) {
                await removeFavorite(
                    pokemon.name
                );

                setFavorites(
                    favorites.filter(
                        (name) =>
                            name !==
                            pokemon.name
                    )
                );
            } else {
                await saveFavorite(
                    pokemon
                );

                setFavorites([
                    ...favorites,
                    pokemon.name,
                ]);
            }
        };

    const handleSearch = (
        text: string
    ) => {
        setSearch(text);

        const filtered =
            pokemons.filter(
                (pokemon) =>
                    pokemon.name
                        .toLowerCase()
                        .includes(
                            text.toLowerCase()
                        )
            );

        setFilteredPokemons(
            filtered
        );
    };

    if (loading) {
        return (
            <View
                style={
                    styles.centerContainer
                }
            >
                <Text>
                    Cargando Pokémon...
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Pokédex 
            </Text>

            <TextInput
                placeholder="Buscar Pokémon..."
                placeholderTextColor="#B999A8"
                value={search}
                onChangeText={
                    handleSearch
                }
                style={styles.searchInput}
            />

            {filteredPokemons.length ===
                0 ? (
                <View
                    style={
                        styles.centerContainer
                    }
                >
                    <Text
                        style={
                            styles.emptyText
                        }
                    >
                        No hay ningún Pokémon que tenga ese nombre
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={
                        filteredPokemons
                    }
                    keyExtractor={(
                        item
                    ) => item.name}
                    numColumns={3}
                    columnWrapperStyle={
                        styles.row
                    }
                    contentContainerStyle={
                        styles.listContent
                    }
                    showsVerticalScrollIndicator={
                        false
                    }
                    renderItem={({
                        item,
                    }) => {
                        const pokemonId =
                            item.url.split(
                                "/"
                            )[6];

                        const imageUrl =
                            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

                        return (
                            <TouchableOpacity
                                style={
                                    styles.card
                                }
                                onPress={() =>
                                    navigation.navigate(
                                        "Detail",
                                        {
                                            pokemonName:
                                                item.name,
                                        }
                                    )
                                }
                            >
                                <TouchableOpacity
                                    style={
                                        styles.favoriteButton
                                    }
                                    onPress={() =>
                                        toggleFavorite(
                                            item
                                        )
                                    }
                                >
                                    <Ionicons
                                        name={
                                            favorites.includes(
                                                item.name
                                            )
                                                ? "heart"
                                                : "heart-outline"
                                        }
                                        size={
                                            18
                                        }
                                        color="#FF6FA9"
                                    />
                                </TouchableOpacity>

                                <Image
                                    source={{
                                        uri: imageUrl,
                                    }}
                                    style={
                                        styles.image
                                    }
                                />

                                <Text
                                    style={
                                        styles.name
                                    }
                                >
                                    {
                                        item.name
                                    }
                                </Text>

                                <Text
                                    style={
                                        styles.number
                                    }
                                >
                                    #
                                    {
                                        pokemonId
                                    }
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
        backgroundColor:
            "#FFF0F7",
    },

    centerContainer: {
        flex: 1,
        justifyContent:
            "center",
        alignItems: "center",
    },

    title: {
        fontSize: 38,
        fontWeight: "bold",
        marginTop: 55,
        marginBottom: 20,
        color: "#A35C7A",
    },

    searchInput: {
        backgroundColor: "#FFFFFF",

        paddingVertical: 14,

        paddingHorizontal: 18,

        borderRadius: 22,

        marginBottom: 22,

        fontSize: 16,

        borderWidth: 2,

        borderColor: "#FFD0E4",

        color: "#6B4F5B",

        shadowColor: "#FFC2DD",

        shadowOffset: {
            width: 0,
            height: 3,
        },

        shadowOpacity: 0.15,

        shadowRadius: 5,

        elevation: 4,
    },

    row: {
        justifyContent:
            "space-between",
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

        shadowColor: "#FFB6D5",

        shadowOffset: {
            width: 0,
            height: 4,
        },

        shadowOpacity: 0.25,

        shadowRadius: 8,

        elevation: 6,
    },

    favoriteButton: {
        position: "absolute",

        top: 8,

        right: 8,

        zIndex: 10,

        backgroundColor:
            "rgba(255,255,255,0.7)",

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

        textTransform:
            "capitalize",

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