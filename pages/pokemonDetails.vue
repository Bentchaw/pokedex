<template lang="pug">
    div
        .header
            <NuxtLink to="/">Home page</NuxtLink>
        .card
            .card__img
                img(v-if="hasSprites" :src="pokemon.sprites.other['dream_world']['front_default']" :alt="getName")
            .card__info
                .card__info--description
                    h1(class="pokemon-number" v-if="hasPokemonId") # {{pokemon.id}} - {{pokemon.name}}
                .card__info--block
                    .card__info--statistic(v-if="hasStats")
                        h1 caracteristics:
                        p(v-for="statInfo in pokemon.stats" :key="statInfo.stat.name") {{statInfo.stat.name}}: {{statInfo['base_stat']}}
                    .card__info--moves(v-if="hasMoves")
                        h1 moves:
                        ul
                            li(v-for="ability in abilitiesListReduced" :key="ability.move.name") {{ability.move.name}}
</template>

<script>
import {getPokemon} from '../Api/api';
export default {
    data() {
        return {
            pokemon: undefined,
        };
    },
    mounted: async function() {
        const {name} = this.$route.params;
        const {data} = await getPokemon(name);
        this.pokemon = {...data, name};
    },
    computed: {
        getName() {
            return this.pokemon.forms[0].name;
        },
        hasPokemonId() {
            return this.pokemon && this.pokemon.id;
        },
        hasSprites() {
           return this.pokemon && this.pokemon.sprites; 
        },
        hasMoves() {
            return this.pokemon && this.pokemon.moves;
        },
        abilitiesListReduced() {
            return this.pokemon.moves.slice(0, 5);
        },
        hasStats() {
            return this.pokemon && this.pokemon.stats;
        }
    }
}
</script>

<style lang="stylus" scoped>
.nuxt-link-prefetched
    text-decoration: none
    text-transform: uppercase
    transition 0.5s
    color black
    font-size 20px
    font-weight 800
    &::after
        position absolute
        content ""
        top 100%
        left 0
        width 100%
        height 3px
        background #3498db
        transform scaleX(0)
        transform-origin right
        transition transform 0.5s
    &:hover
        color #95a5a6


.header
    display flex
    align-items center
    justify-content center
    height 200px
    background-color #c7ceea

.card
    margin 5% 30%
    border 1px solid red
    display flex
    flex-direction row
    flex-wrap wrap
    align-items center
    justify-content center
    box-shadow 0 4px 8px 0 rgba(0,0,0,0.2)
    border 1px solid #E3E7F5
    &__info--description
        padding 10px 0
        font-size 24px
        font-weight 900

.card__info--block
    display flex

.card__img, .card__info
    padding 5% 50px
    h1
        text-decoration underline

.card__info
    &--block
        &--moves
            padding 0 10px

</style>