import { Store } from "./types";
import * as Sudoku from "../sudoku/types";
import { settings as sudokuSettings } from "../sudoku";

import create from "zustand";
import produce from "immer";

import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useStore = create<Store>(
  persist(
    (set) => ({
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
            state.game.started = true;
          })
        ),
      endGame: () =>
        set(
          produce((state) => {
            state.game.board = null;
            state.game.started = false;
          })
        ),
      saveBoard: (board: Sudoku.Cell[][]) =>
        set(
          produce((state) => {
            state.game.board = board;
          })
        ),
      updateSettings: (settings: Store["settings"]) =>
        set(
          produce((state) => {
            state.settings = settings;
          })
        ),
    }),
    {
      name: "sudoku-halie-storage",
      getStorage: () => AsyncStorage,
    }
  )
);
