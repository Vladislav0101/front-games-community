import { ApolloError } from "@apollo/client";
import { defineStore } from "pinia";

import { IState, IGameCard } from "@/models/gamesListStore";
import gamesList from "@/content/gamesList.json";

import { gameCardsService } from "@/services/index";

export const gamesListStore = defineStore("games", {
  state: (): IState => ({
    gamesCards: [],
    isAllGamesLoaded: false,
    displayedGames: [],
  }),

  getters: {},

  actions: {
    fetchCards() {
      gameCardsService.getAllGameCards
        .then((result) => {
          this.gamesCards = this.displayedGames = result;
          this.isAllGamesLoaded = true;
        })
        .catch((err) => {
          throw new Error(err);
        });
    },

    changeDisplayedGames({ searchingName }: { searchingName: string }) {
      if (!this.isAllGamesLoaded) {
        // logic for games which were not loaded;
        // means need to load games from server by chosen params
        this.displayedGames = [];
        return;
      }

      if (!searchingName) {
        this.displayedGames = this.gamesCards;
        return;
      }

      const gamesCards = [...this.gamesCards];

      const regexpForName = new RegExp(searchingName, "i");

      this.displayedGames = gamesCards.reduce((acc, game) => {
        const conditionToAddingByName =
          searchingName && regexpForName.test(game.name);

        if (conditionToAddingByName) acc.push(game);

        return acc;
      }, [] as Array<IGameCard>);
    },
  },
});
