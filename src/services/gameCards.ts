import ApolloClient from "@/plugins/ApolloClient";
import { gql } from "graphql-tag";
import { useQuery, provideApolloClient } from "@vue/apollo-composable";

import { IGameCard } from "@/models/gamesListStore";

const GAME_CARDS_QUERY = gql`
  query getGameCards {
    gameCards {
      name
      value
      image
      rating
      color
    }
  }
`;

provideApolloClient(ApolloClient);

const getAllGameCards = new Promise((res, rej) => {
  const { onResult, onError }: any = useQuery(GAME_CARDS_QUERY);

  onResult((result: any) => {
    const gameCards: Array<IGameCard> = result.data.gameCards;
    res(gameCards);
  });

  onError((error: any) => {
    rej(error);
  });
});

export default { getAllGameCards };
