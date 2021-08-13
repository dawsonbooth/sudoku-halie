import { settings as actions } from "../actions";
import { State, Action } from "../types";
import { settings as SudokuSettings } from "../../sudoku";

const initialState: State["settings"] = {
  sudoku: SudokuSettings,
  app: {
    darkMode: false,
  },
};

function settings(state = initialState, action: Action): State["settings"] {
  switch (action.type) {
    case actions.UPDATE:
      return {
        ...state,
        ...action.settings,
      };
    default:
      return state;
  }
}

export default settings;
