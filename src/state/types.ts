import { Game, Location, NewGameOptions, Colors } from "../sudoku/types";

export interface Store {
  game: Game | null;
  notesMode: boolean;
  startGame: (options: NewGameOptions) => void;
  endGame: () => void;
  handleCellPress: (location: Location) => void;
  handleNotesButtonPress: () => void;
  handleEraserButtonPress: () => void;
  handleRevealButtonPress: () => void;
  handleNumberButtonPress: (number: number) => void;
  settings: Settings;
  updateSettings: (settings: Settings) => void;
  getColors: (theme: Record<string, string>) => Colors;
}

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
