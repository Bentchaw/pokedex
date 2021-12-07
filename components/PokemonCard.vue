<template lang="pug">
    .card
        .card__img
            img(v-if="hasSprites" :src="pokemon.sprites['front_default']" :alt="info.name")
        .card__info
            span(class="pokemon-number" v-if="pokemon && pokemon.id") # {{pokemon.id}} - {{info.name}}
        .button
            a(:href="this.info.name") details
            button(v-if="!isInTeam" @click="addPokemon") Add
</template>

<script>
import _ from 'lodash';
import {getPokemon} from '../Api/api';

export default {
    props: {
        info: Object,
    },
    data() {
        return {
            pokemon: undefined,
            isInTeam: false,
        }
    },
    mounted: async function () {
        const {data} = await getPokemon(this.info.name);
        this.pokemon = data;
        if(this.pokemon) {
            this.isInTeam = this.isInPokemonTeamList();
        }
    },
    computed: {
        hasSprites() {
           return this.pokemon && this.pokemon.sprites; 
        }
    },
    methods: {
        isInPokemonTeamList() {
            return _.intersectionBy([this.pokemon], this.$store.state.team, 'name').length > 0;
        },
        addPokemon() {
            this.$store.commit('addPokemon', this.pokemon)
        }
    }
}
</script>

<style lang="stylus" scoped>
.card
    margin 10px
    padding 5px 10px
    width 180px
    height 180px
    border-radius 30px
    display flex
    flex-direction column
    align-items center
    box-shadow 0 4px 8px 0 rgba(0,0,0,0.2)
    transition 0.3s
    border 1px solid #E3E7F5

.card:hover 
  box-shadow 0 8px 16px 0 rgba(0,0,0,0.2)

.card__info
    padding 10px
ul
    list-style-type none

a:link, a:visited, button
    border-radius 10px
    background-color #ABAFC0
    color white
    padding 14px 25px
    text-align center
    text-decoration none
    display inline-block


a:hover, a:active
  background-color #B9BED5

.button
    display flex
    flex-direction row
    align-items center
    justify-content center
    button
        margin-left 5px
</style>