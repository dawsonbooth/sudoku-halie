import { compose, createStore } from "redux";
import { Sudoku } from "../components";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const initialState: Redux.State = {
    board: null,
    gameStarted: false,
    settings: {
        sudoku: Sudoku.settings,
        app: {
            darkMode: false
        }
    }
};

const reducer = (state: Redux.State = initialState, action: Redux.Action) => {
    switch (action.type) {
        case "START_GAME":
            return {
                ...state,
                ...{
                    gameStarted: true
                }
            };
        case "END_GAME":
            return {
                ...state,
                ...{
                    board: null,
                    gameStarted: false
                }
            };
        case "SET_BOARD":
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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducer, composeEnhancers());
