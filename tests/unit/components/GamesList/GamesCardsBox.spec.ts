import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";

import { gamesListStore as gamesListStoreInitialization } from "@/stores/gamesListStore";
import gamesListJson from "@/content/gamesList.json";

import GamesCardsBox from "@/components/GamesList/GamesCardsBlock/GamesCardsBox.vue";
import GameCard from "@/components/GamesList/GamesCardsBlock/GameCard.vue";

describe("Games list", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  function factoryGamesCardsBox() {
    const gamesListStore = gamesListStoreInitialization();
    gamesListStore.fetchCards();

    const mountedWrapper = mount(GamesCardsBox, {});

    return {
      mountedWrapper,
      gamesListStore,
    };
  }

  it("All games cards are added to the store", () => {
    const factory = factoryGamesCardsBox();
    const mockCardsJson = JSON.parse(JSON.stringify(gamesListJson));

    expect(factory.gamesListStore.gamesCards.length).toBe(mockCardsJson.length);
  });

  it("All games cards are rendered", () => {
    const factory = factoryGamesCardsBox();

    expect(factory.mountedWrapper.findAllComponents(GameCard).length).toBe(
      factory.gamesListStore.gamesCards.length
    );
  });

  it("Games cards have them name", () => {
    const factory = factoryGamesCardsBox();

    factory.mountedWrapper.findAllComponents(GameCard).forEach((el, idx) => {
      expect(el.text()).toMatch(factory.gamesListStore.gamesCards[idx].name);
    });
  });

  it("Games cards have them image src", () => {
    const factory = factoryGamesCardsBox();

    factory.mountedWrapper.findAllComponents(GameCard).forEach((el, idx) => {
      expect(
        el
          .find("img")
          .element.src.includes(factory.gamesListStore.gamesCards[idx].image)
      ).toBeTruthy();
    });
  });
});
