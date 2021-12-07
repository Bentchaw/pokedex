import axios from 'axios';
const POKEMONS_LIMIT = 100;
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export async function getAllPokemons() {
    try {
        return await axios.get(BASE_URL, {
            params: {
                limit: POKEMONS_LIMIT,
            }, 
        });
    } catch (err) {
        console.error("Didn't get any pokemons", err);
    }
}

export async function getPokemon(name) {
    try {
        return await axios.get(`${BASE_URL}/${name}`);
    } catch (err) {
        console.error("Can't get pokemon info", err);
    }
}