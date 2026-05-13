import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
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
                keyExtractor={(item) => item.name()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.name}>
                            {item.name}
                        </Text>
                    </View>
                )}
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
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
});