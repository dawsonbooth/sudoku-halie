import React from "react";
import * as screens from "../screens";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { mapping, dark, light } from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { useSettings } from "../redux";
import { StatusBar } from "react-native";

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  const { settings } = useSettings();

  const darkMode = settings.app.darkMode;

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={darkMode ? dark : light}>
        <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Home" component={screens.Home} />
            <Stack.Screen name="Game" component={screens.Game} />
            <Stack.Screen name="NewGame" component={screens.NewGame} />
            <Stack.Screen name="Settings" component={screens.Settings} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};

export default AppNavigator;
