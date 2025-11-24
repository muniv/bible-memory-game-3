export interface WordItem {
  id: number;
  text: string;
  isHidden: boolean;
}

export enum GameState {
  PLAYING = 'PLAYING',
  COMPLETED = 'COMPLETED',
}
