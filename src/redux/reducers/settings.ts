import { settings as actions } from "../actions";
import { State, Action } from "../types";
import { settings as SudokuSettings } from "../../components/Sudoku";

const initialState: State["settings"] = {
  sudoku: SudokuSettings,
  app: {
    darkMode: false
  }
};

function settings(state = initialState, action: Action) {
  switch (action.type) {
    case actions.UPDATE: // TODO: Use AsyncStorage logic in this update and in initialState
      return {
        ...state,
        ...{
          settings: action.settings
        }
      };
    default:
      return state;
  }
}

export default settings;
