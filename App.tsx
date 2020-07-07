import "react-native-gesture-handler";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/redux";
import AppNavigator from "./src/navigation/AppNavigator";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import translations from "./src/locales";

i18n.translations = translations;
i18n.locale = Localization.locale;
i18n.fallbacks = true;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
