import { combineReducers } from "redux";
import game from "./game";
import settings from "./settings";

const rootReducer = combineReducers({
  game,
  settings
});

export default rootReducer;
