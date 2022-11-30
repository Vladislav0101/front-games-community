<template>
  <div>
    <GamesListMain />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import GamesListMain from "@/components/GamesList/GamesListMain.vue";

export default defineComponent({
  components: { GamesListMain },
});
</script>
