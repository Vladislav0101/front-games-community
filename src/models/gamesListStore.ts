export interface IGameCard {
  value: string;
  name: string;
  image: string;
  rating: number;
  color: number;
}

export interface IState {
  displayedGames: Array<IGameCard>;
  isAllGamesLoaded: boolean;
  gamesCards: Array<IGameCard>;
}

export interface IClickingBallSettings {
  x: string;
  y: string;
  opacity: string;
  transform: string;
}
