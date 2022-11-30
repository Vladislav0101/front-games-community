import { Ref, nextTick } from "vue";
import { shallowMount } from "@vue/test-utils";
import { createPinia, setActivePinia, storeToRefs } from "pinia";

import { gamesListStore as gamesListStoreInitialization } from "@/stores/gamesListStore";
import { IGameCard } from "@/models/gamesListStore";

import GamesSearching from "@/components/GamesList/GamesSearching.vue";

interface IGamesListStoreRefs {
  gamesCards: Ref<Array<IGameCard>>;
  displayedGames: Ref<Array<IGameCard>>;
}

describe("Searching games", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("Changing input updates 'v-model' value 'searchingGame'", () => {
    const wrapper = shallowMount(GamesSearching);
    const input = wrapper.find(".games_searching");
    const testedString = "call of duty";

    input.setValue(testedString);

    expect(wrapper.vm.searchingGame).toBe(testedString);
  });

  it("Empty input shows all cards", async () => {
    const wrapper = shallowMount(GamesSearching);
    const input = wrapper.find(".games_searching");

    const gamesListStore = gamesListStoreInitialization();
    const { gamesCards, displayedGames }: IGamesListStoreRefs =
      storeToRefs(gamesListStore);

    gamesListStore.fetchCards();
    expect(gamesCards.value.length > 0).toBeTruthy();

    const startString = "abc";
    input.setValue(startString);
    await nextTick();
    expect(wrapper.vm.searchingGame).toBe(startString);

    const emptyString = "";
    input.setValue(emptyString);
    await nextTick();
    expect(wrapper.vm.searchingGame).toBe(emptyString);

    expect(gamesCards.value.length).toBe(displayedGames.value.length);
  });

  it("Spaces around string are ignored ", async () => {
    const wrapper = shallowMount(GamesSearching);
    const input = wrapper.find(".games_searching");

    const stringFromSpaces = "       ";
    const emptyString = "";
    input.setValue(stringFromSpaces);
    expect(wrapper.vm.searchingGame).toBe(emptyString);

    const gameName = "call of duty";
    const gameNameWithSpaces = `   ${gameName}   `;
    input.setValue(gameNameWithSpaces);
    expect(wrapper.vm.searchingGame).toBe(gameName);
  });

  it("A card can be found", () => {
    const wrapper = shallowMount(GamesSearching);
    const input = wrapper.find(".games_searching");

    const gamesListStore = gamesListStoreInitialization();
    const { gamesCards, displayedGames }: IGamesListStoreRefs =
      storeToRefs(gamesListStore);

    gamesListStore.fetchCards();
    expect(gamesCards.value.length > 0).toBeTruthy();

    const gameName = gamesCards.value[0].name;

    input.setValue(gameName);

    expect(
      displayedGames.value.find((game) => game.name === gameName)
    ).toBeTruthy();
  });
});
