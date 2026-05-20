import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { getFavorites, removeFavorite, } from "../storage/favoritesStorage";

export default function FavoritesScreen() {
    const navigation = useNavigation<any>();

    const [favorites, setFavorites] =
        useState<any[]>([]);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites =
        async () => {
            const data =
                await getFavorites();

            setFavorites(data);
        };

    const removeFromFavorites =
        async (pokemonName: string) => {
            await removeFavorite(
                pokemonName
            );

            const updatedFavorites =
                favorites.filter(
                    (pokemon) =>
                        pokemon.name !==
                        pokemonName
                );

            setFavorites(
                updatedFavorites
            );
        };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Favorites
            </Text>

            {favorites.length ===
                0 ? (
                <View
                    style={
                        styles.emptyContainer
                    }
                >
                    <Text
                        style={
                            styles.emptyText
                        }
                    >
                        No tienes favoritos
                        aún
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={favorites}
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
                            item.url.split("/")[6];

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
                                        removeFromFavorites(
                                            item.name
                                        )
                                    }
                                >
                                    <Ionicons
                                        name="heart"
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

    title: {
        fontSize: 38,
        fontWeight: "bold",
        marginTop: 55,
        marginBottom: 20,
        color: "#A35C7A",
    },

    emptyContainer: {
        flex: 1,
        justifyContent:
            "center",
        alignItems: "center",
    },

    emptyText: {
        fontSize: 16,
        color: "#9B7E89",
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
});