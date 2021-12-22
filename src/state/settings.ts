import produce from "immer";
import { SettingsSlice, SliceCreator } from "./types";

const createSettingsSlice: SliceCreator<SettingsSlice> = (set, get) => ({
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
      produce((state: SettingsSlice) => {
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
});

export default createSettingsSlice;
