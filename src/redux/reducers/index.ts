import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { AsyncStorage } from "react-native";
import game from "./game";
import settings from "./settings";

AsyncStorage.clear(); // FOR DEBUGGING // TODO

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = persistReducer(
  persistConfig,
  combineReducers({
    game,
    settings,
  })
);

export default rootReducer;
