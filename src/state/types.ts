import * as Sudoku from "../sudoku";

export interface Store {
  game: Game;
  settings: Settings;
  startGame: () => void;
  endGame: () => void;
  saveBoard: (board: Sudoku.Cell[][]) => void;
  updateSettings: (settings: Settings) => void;
}

export interface Game {
  board: Sudoku.Game["board"] | null;
  started: boolean;
}

export interface Settings {
  sudoku: Sudoku.Settings;
  app: {
    darkMode: boolean;
  };
}

export interface Action {
  type: string;
  board?: Sudoku.Game["board"];
  settings?: Settings;
}
