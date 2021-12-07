<template lang="pug">
    .team-container
        .header
        p.pokemon-counter Pokemons displayed: {{pokemons.length}}
        .pokemon-card-container
            PokemonCard(
                v-for=" pokemon in pokemons"
                :key="pokemon.name"
                :info="pokemon"
            )
</template>

<script>
import PokemonCard from '../components/PokemonCard.vue'

export default {
    components: {
        PokemonCard,
    },
    data() {
        return {
            pokemons: [],
        };
    },
    mounted: async function() {
        this.pokemons = this.$store.state.team;
    },
};
</script>

<style lang="stylus" scoped>
.team-container
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