export interface IGameCard {
  readonly value: string;
  readonly name: string;
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
