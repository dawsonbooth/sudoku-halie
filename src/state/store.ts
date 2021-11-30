import * as Game from "../sudoku/game"; // TODO: New library for game logic

import create from "zustand";
import produce from "immer";

import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Store } from "./types";
import * as Sudoku from "../sudoku/types";

export const useStore = create<Store>(
  persist(
    (set) => ({
      game: null,
      notesMode: false,
      startGame: (options: Sudoku.NewGameOptions) =>
        set(
          produce((state: Store) => {
            state.game = Game.newGame(options);
          })
        ),
      endGame: () =>
        set(
          produce((state: Store) => {
            state.game = null;
          })
        ),
      handleCellPress: (location: Sudoku.Location) =>
        set(
          produce((state: Store) => {
            if (state.game) Game.select(state.game, location);
          })
        ),
      handleNotesButtonPress: () =>
        set(
          produce((state: Store) => {
            if (state.game) state.notesMode = !state.notesMode;
          })
        ),
      handleEraserButtonPress: () =>
        set(
          produce((state: Store) => {
            if (state.game) Game.erase(state.game);
          })
        ),
      handleRevealButtonPress: () =>
        set(
          produce((state: Store) => {
            if (state.game) Game.reveal(state.game);
          })
        ),
      handleNumberButtonPress: (num: number) =>
        set(
          produce((state: Store) => {
            if (state.game)
              if (state.notesMode) Game.toggleNote(state.game, num);
              else Game.write(state.game, num);
          })
        ),
      settings: {
        app: {
          darkMode: false,
        },
        sudoku: {
          dotNotes: false,
          showCompleted: true,
          showPeers: true,
          showEqual: true,
          showConflicts: true,
        },
      },
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
