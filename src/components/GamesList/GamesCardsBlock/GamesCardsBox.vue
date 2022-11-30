<template>
  <transition-group
    class="games-cards container"
    name="games-cards"
    tag="section"
  >
    <GameCard
      v-for="game of displayedGames"
      :key="game.name"
      :gameInfo="game"
    />
  </transition-group>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";

import { gamesListStore as gamesListStoreInitialization } from "@/stores/gamesListStore";

import GameCard from "@/components/GamesList/GamesCardsBlock/GameCard.vue";

export default defineComponent({
  components: { GameCard },

  setup() {
    const gamesListStore = gamesListStoreInitialization();

    onMounted(() => {
      gamesListStore.fetchCards();
    });

    const { displayedGames } = storeToRefs(gamesListStore);

    watch(displayedGames, (value) => console.log(value));

    return { displayedGames };
  },
});
</script>

<style lang="scss" scoped>
.games-cards {
  display: grid;
  gap: 70px;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
}

.games-cards-enter-active,
.games-cards-leave-active {
  transition: all 0.2s linear;
}
.games-cards-enter-from,
.games-cards-leave-to {
  opacity: 0;
}
</style>
