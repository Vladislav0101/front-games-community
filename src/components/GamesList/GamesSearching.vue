<template>
  <section>
    <input type="text" class="games_searching" v-model.trim="searchingGame" />
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, watch } from "vue";

import { gamesListStore as gamesListStoreInitialization } from "@/stores/gamesListStore";

export default defineComponent({
  setup() {
    const gamesListStore = gamesListStoreInitialization();

    const searchingGame: Ref<string> = ref("");

    watch(searchingGame, (value: string) => {
      gamesListStore.changeDisplayedGames({
        searchingName: value,
      });
    });

    return {
      searchingGame,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/colors.scss";

.games_searching {
  background-color: $color-primary-2;
  border: none;
  outline: none;
  height: 28px;
  width: 100%;
}
</style>
