import { compose, createStore } from "redux";
import { persistStore } from "redux-persist";
import reducers from "./reducers";
import { State } from "./types";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const preloadedState: State = {
  game: undefined,
  settings: undefined
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducers, preloadedState, composeEnhancers());
export const persistor = persistStore(store);
