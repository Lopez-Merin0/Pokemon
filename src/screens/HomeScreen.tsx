import { useEffect, useState } from 'react';
import { View, Image, Text, FlatList, StyleSheet } from 'react-native';
import { getPokemons } from '../services/pokemonService';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export default function HomeScreen() {
    const [pokemons, setPokemons] = useState<any[]>([]);
    useEffect(() => {
        loadPokemons();
    }, []);

    const loadPokemons = async () => {
        try {
            const data = await getPokemons();
            setPokemons(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pokédex</Text>
            <FlatList
                data={pokemons}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => {
                    const pokemonId = item.url.split("/")[6];
                    console.log(item.url);
                    console.log(pokemonId);

                    const imageUrl =
                        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
                    return (
                        <View style={styles.card}>
                            <Text style={styles.number}>
                                #{pokemonId}
                            </Text>
                            <Image
                                source={{ uri: imageUrl }}
                                style={styles.image}
                            />
                            <Text style={styles.name}>
                                {item.name}
                            </Text>
                        </View>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fdc6f1',
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
        marginTop: 40,
    },
    card: {
        padding: 15,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    image: {
        width: 100,
        height: 100,
        alignSelf: 'center',
    },
    number: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});