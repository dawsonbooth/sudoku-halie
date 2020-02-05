import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux";
import AppNavigator from "./src/navigation/AppNavigator";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
