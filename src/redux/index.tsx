import { createStore } from "redux";
import { Provider as _Provider } from "react-redux";
import { Sudoku } from "../components";

const initialState: Redux.State = {
    game: null,
    settings: {
        sudoku: Sudoku.settings,
        app: {
            darkMode: false
        }
    }
};

const reducer = (state: Redux.State = initialState, action: Redux.Action) => {
    switch (action.type) {
        case "END_GAME":
            return {
                ...state,
                ...{
                    game: null
                }
            };
        case "SET_GAME_STATE":
            return {
                ...state,
                ...{
                    game: action.game
                }
            };
        case "UPDATE_SETTINGS": // TODO: Use AsyncStorage logic in this update and in initialState
            return {
                ...state,
                ...{
                    settings: action.settings
                }
            };
    }
    return state;
};
export const store = createStore(reducer);
