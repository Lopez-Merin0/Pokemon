import axios from 'axios';

const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
});

export const getPokemons = async () => {
    try {
        const response = await api.get('/pokemon?limit=20');
        return response.data.results;
    } catch (error) {
        console.log("Error obteniendo a los pokemones: ", error);
        throw error;
    }
};

export const getPokemonDetail = async (
  name: string
) => {
  try {
    const response = await api.get(
      `/pokemon/${name}`
    );

    return response.data;
  } catch (error) {
    console.log(
      "Error obteniendo detalle:",
      error
    );

    throw error;
  }
};