<template>
  <div class="game-card" @mousedown="mouseDown">
    <img :src="gameInfo.image" :alt="gameInfo.name" />

    <h4>{{ gameInfo.name }}</h4>

    <div class="clicking-ball"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from "vue";

import { IGameCard, IClickingBallSettings } from "@/models/gamesListStore";

export default defineComponent({
  props: {
    gameInfo: {
      type: Object as PropType<IGameCard>,
      require: true,
    },
  },

  setup() {
    const clickingBallSettings = reactive({
      x: "",
      y: "",
      opacity: "",
      transform: "scale(0)",
    } as IClickingBallSettings);

    const showClickingBall = (event: MouseEvent) => {
      const ballSize = 120;

      clickingBallSettings.x = `${event.pageX - ballSize / 2}px`;
      clickingBallSettings.y = `${event.pageY - ballSize / 2}px`;
      clickingBallSettings.opacity = "0.3";
      clickingBallSettings.transform = "scale(1)";
    };

    const hideClickingBall = () => {
      clickingBallSettings.transform = "scale(0)";
      clickingBallSettings.opacity = "0";
    };

    const mouseDown = (event: MouseEvent) => {
      showClickingBall(event);

      setTimeout(() => hideClickingBall(), 200);
    };

    return { mouseDown, clickingBallSettings };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/colors.scss";

.game-card {
  cursor: pointer;
  width: 200px;

  img {
    border-radius: 7px;
    box-shadow: 0 0 16px v-bind("gameInfo.color");
    height: 250px;
    object-fit: cover;
    transition: all 0.2s linear;
    width: 200px;
  }

  h4 {
    color: $color-primary-2;
    margin-top: 15px;
  }

  &:hover img {
    box-shadow: none;
    transform: scale(1.05);
  }

  .clicking-ball {
    background: radial-gradient(
      circle,
      v-bind("gameInfo.color") 0%,
      rgba(255, 255, 255, 0) 75%
    );
    border-radius: 100%;
    left: v-bind("clickingBallSettings.x");
    opacity: v-bind("clickingBallSettings.opacity");
    position: absolute;
    top: v-bind("clickingBallSettings.y");
    transition: transform 0.2s linear;
    transform: v-bind("clickingBallSettings.transform");
    height: 120px;
    width: 120px;
  }
}
</style>
