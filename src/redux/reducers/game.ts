import { game as actions } from "../actions";
import { State, Action } from "../types";

const initialState: State["game"] = {
  started: false,
  board: null
};

function game(state = initialState, action: Action) {
  switch (action.type) {
    case actions.START:
      return {
        ...state,
        ...{
          started: true
        }
      };
    case actions.END:
      return {
        ...state,
        ...{
          board: null,
          started: false
        }
      };
    case actions.SAVE:
      return {
        ...state,
        ...{
          board: action.board
        }
      };
    default:
      return state;
  }
}

export default game;
