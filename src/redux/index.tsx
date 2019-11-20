import { createStore } from "redux";
import { Provider as _Provider } from "react-redux";

const initialState: Redux.State = {
    settings: {
        sudoku: {
            dotNotes: false,
            feedbackCorrect: true,
            feedbackIncorrect: false
        },
        app: {
            darkMode: false
        }
    }
};

const reducer = (state: Redux.State = initialState, action: Redux.Action) => {
    switch (action.type) {
        case "UPDATE_SETTINGS": // TODO: Use AsyncStorage logic in this update and in initialState
            return {
                settings: action.settings
            };
    }
    return state;
};
export const store = createStore(reducer);
