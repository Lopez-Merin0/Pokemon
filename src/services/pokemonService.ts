import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

export const getPokemons = async () => {
  try {
    const response = await api.get('/pokemon?limit=150');
    return response.data.results;
  } catch (error) {
    console.log("Error obteniendo a los pokemones: ", error);
    throw error;
  }
};

export const getPokemonDetail = async (
  name: string) => {
  try {
    const response = await api.get(`/pokemon/${name}`);
    return response.data;

  } catch (error) {
    console.log("Error obteniendo detalle:", error);
    throw error;
  }
};

export const getPokemonSpecies =
  async (name: string) => {

    try {

      const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
      return await response.json();

    } catch (error) {
      console.log(error);
      return null;
    }
  };

export const getEvolutionChain =
  async (url: string) => {

    try {

      const response = await fetch(url);
      return await response.json();

    } catch (error) {
      console.log(error);
      return null;
    }
  };

export const getPokemonTypes =
  async () => {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/type");
      const data = await response.json();
      return data.results;

    } catch (error) {
      console.log(error);
      return [];
    }
  };

export const getPokemonsByType =
  async (type: string) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const data = await response.json();
      return data.pokemon;

    } catch (error) {
      console.log(error);
      return [];
    }
  };