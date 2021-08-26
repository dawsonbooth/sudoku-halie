import { Store } from "./types";
import * as Sudoku from "../sudoku/types";
import { settings as sudokuSettings } from "../sudoku";

import create from "zustand";
import produce from "immer";

export const useStore = create<Store>((set) => ({
  game: { started: false, board: null },
  settings: {
    sudoku: sudokuSettings,
    app: {
      darkMode: false,
    },
  },
  startGame: () =>
    set(
      produce((state) => {
        state.started = true;
      })
    ),
  endGame: () =>
    set(
      produce((state) => {
        state.board = null;
        state.started = false;
      })
    ),
  saveBoard: (board: Sudoku.Cell[][]) =>
    set(
      produce((state) => {
        state.board = board;
      })
    ),
  updateSettings: (settings: Store["settings"]) =>
    set(
      produce((state) => {
        state.settings = settings;
      })
    ),
}));
