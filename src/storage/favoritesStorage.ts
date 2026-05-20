import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "@favorites";

export const getFavorites =
    async () => {
        try {
            const favorites = await AsyncStorage.getItem(FAVORITES_KEY);

            return favorites ? JSON.parse
                (favorites) : [];
        } catch (error) {
            console.log(error);
            return [];
        }
    };

export const saveFavorite =
    async (pokemon: any) => {
        try {
            const favorites = await getFavorites();

            const exists = favorites.find
                ((fav: any) => fav.name === pokemon.name);

            if (exists) {
                return;
            }

            const updatedFavorites = [...favorites, pokemon,];

            await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
        } catch (error) {
            console.log(error);
        }
    };

export const removeFavorite =
    async (pokemonName: string) => {
        try {
            const favorites = await getFavorites();

            const updatedFavorites = favorites.filter
                ((fav: any) => fav.name !== pokemonName);

            await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));

        } catch (error) {
            console.log(error);
        }
    };