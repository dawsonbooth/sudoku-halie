import * as Sudoku from "../sudoku";

export interface State {
  game: Game;
  settings: Settings;
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
  type: String;
  board?: Sudoku.Game["board"];
  settings?: Sudoku.Settings;
}
