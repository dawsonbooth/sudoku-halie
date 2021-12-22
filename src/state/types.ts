import { GetState, SetState, StoreApi } from "zustand";
import { Colors, Game, Location, NewGameOptions } from "../sudoku/types";

export type Store = GameSlice & SettingsSlice;

export type GameSlice = {
  game: Game | null;
  notesMode: boolean;
  startGame: (options: NewGameOptions) => void;
  endGame: () => void;
  handleCellPress: (location: Location) => void;
  handleNotesButtonPress: () => void;
  handleEraserButtonPress: () => void;
  handleRevealButtonPress: () => void;
  handleNumberButtonPress: (number: number) => void;
};

export type SettingsSlice = {
  settings: Settings;
  updateSettings: (settings: Settings) => void;
  getColors: (theme: Record<string, string>) => Colors;
};

export type SliceCreator<TSlice extends Partial<Store>> = (
  set: SetState<Store>,
  get: GetState<TSlice>,
  api: StoreApi<Store>
) => TSlice;

export interface Settings {
  app: {
    darkMode: boolean;
  };
  sudoku: {
    dotNotes: boolean;
    showCompleted: boolean;
    showPeers: boolean;
    showEqual: boolean;
    showConflicts: boolean;
  };
}
