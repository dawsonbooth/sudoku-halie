import React from 'react';
import DrawerContainer from './src/navigation/DrawerContainer';
import { Provider } from 'react-redux';
import { store } from './src/redux';

export default function App() {
  return (
    <Provider store={store}>
      <DrawerContainer />
    </Provider>
  );
}

