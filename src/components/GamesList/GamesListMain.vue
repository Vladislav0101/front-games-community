<template>
  <main class="container" id="games-list-main">
    <GamesSearching class="games__list--searching" />

    <div class="games__list--filter"></div>

    <GamesCardsBox class="games__list--cards__box" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import GamesSearching from "@/components/GamesList//GamesSearching.vue";
import GamesCardsBox from "@/components/GamesList/GamesCardsBlock/GamesCardsBox.vue";

export default defineComponent({
  components: { GamesSearching, GamesCardsBox },
});
</script>

<style lang="scss" scoped>
main#games-list-main {
  display: grid;
  grid-template-columns: 20% 80%;
  row-gap: 40px;

  .games__list--searching {
    grid-area: 1/2/2/3;
  }

  .games__list--filter {
    grid-area: 2/1/3/2;
  }

  .games__list--cards__box {
    grid-area: 2/2/3/3;
  }
}
</style>
