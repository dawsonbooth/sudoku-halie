import "react-native-gesture-handler";
import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import translations from "./src/locales";

i18n.translations = translations;
i18n.locale = Localization.locale;
i18n.fallbacks = true;

const App: React.FC = () => {
  return <AppNavigator />;
};

export default App;
