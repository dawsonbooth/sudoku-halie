import { createStore } from "redux";
import { Sudoku } from "../components";

const initialState: Redux.State = {
    board: null,
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
                    board: null
                }
            };
        case "SET_GAME_STATE":
            return {
                ...state,
                ...{
                    board: action.board
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
