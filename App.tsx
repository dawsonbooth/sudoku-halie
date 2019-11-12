import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import AppContainer from './src/AppContainer';


const initialState: State = {
  count: 0
}
const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'INCREASE_COUNTER':
      return {
        count: state.count + 1
      }
    case 'DECREASE_COUNTER':
      return {
        count: state.count - 1
      }
  }
  return state;
}
const store = createStore(reducer);

export default function App() {

  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

