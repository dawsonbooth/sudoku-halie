import * as Game from "../sudoku/game"; // TODO: New library for game logic

import create from "zustand";
import produce from "immer";

import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Store } from "./types";
import * as Sudoku from "../sudoku/types";

export const useStore = create<Store>(
  persist(
    (set, get) => ({
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
      handleCellPress: (location) =>
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
      handleNumberButtonPress: (num) =>
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
      updateSettings: (settings) =>
        set(
          produce((state) => {
            state.settings = settings;
          })
        ),
      getColors: (theme) =>
        get().settings.app.darkMode
          ? {
              text: theme["text-basic-color"],
              board: {
                border: theme["border-basic-color-4"],
                cell: {
                  normal: theme["background-basic-color-1"],
                  peer: theme["color-basic-700"],
                  equal: theme["background-basic-color-2"],
                  conflict: theme["color-danger-hover"],
                  selected: theme["color-primary-hover"],
                  completed: theme["color-success-hover"],
                },
              },
              controls: {
                numberButton: {
                  background: theme["background-basic-color-1"],
                  border: theme["background-basic-color-2"],
                  progress: theme["color-primary-hover"],
                  completed: theme["color-success-hover"],
                },
              },
            }
          : {
              text: theme["text-basic-color"],
              board: {
                border: theme["border-alternative-color-4"],
                cell: {
                  normal: theme["background-basic-color-1"],
                  peer: theme["color-info-200"],
                  equal: theme["color-info-300"],
                  conflict: theme["color-danger-300"],
                  selected: theme["color-warning-200"],
                  completed: theme["color-success-200"],
                },
              },
              controls: {
                numberButton: {
                  background: theme["background-basic-color-1"],
                  border: theme["background-basic-color-4"],
                  progress: theme["color-info-hover"],
                  completed: theme["color-success-hover"],
                },
              },
            },
    }),
    {
      name: "sudoku-halie-storage",
      getStorage: () => AsyncStorage,
    }
  )
);
