export const state = () => ({
    team: [],   
});

export const mutations = {
    addPokemon(state, pokemon) {
        state.team.push(pokemon);
    }
};