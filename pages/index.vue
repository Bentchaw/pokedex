<template lang="pug">
    .container
        .header
            <NuxtLink to="/team">My TEAM</NuxtLink>
            input(type="text" v-model="text" placeholder="Pokemon's name")
        p.pokemon-counter Pokemons displayed: {{filteredPokemons.length}}
        .pokemon-card-container
            PokemonCard(
                v-for=" pokemon in filteredPokemons"
                :key="pokemon.name"
                :info="pokemon"
            )
</template>

<script>
import {getAllPokemons} from '../Api/api';
import PokemonCard from '../components/PokemonCard.vue'

export default {
    components: {
        PokemonCard,
    },
    data() {
        return {
            pokemons: [],
            text: '',
            isHomePage: true
        };
    },
    mounted: async function() {
        const {data: {results: pokemons}} = await getAllPokemons();
        this.pokemons = pokemons;
    },
    computed: {
        filteredPokemons() {
            return this.pokemons.filter(pokemon => pokemon.name.includes(this.text));
        },
    }
};
</script>

<style lang="stylus" scoped>
.container
    text-align center

.header
    display flex
    align-items center
    justify-content center
    height 200px
    background-color #c7ceea

input
    width 30%
    height 20px
    height 50px
    border-radius 10px

.pokemon-counter
    margin 2%

.pokemon-card-container
    margin 2% 20%
    display flex
    flex-wrap wrap
    flex-direction row
    align-items center
    justify-content center

</style>