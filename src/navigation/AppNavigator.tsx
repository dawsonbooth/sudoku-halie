import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import * as screens from "../screens";

export type StackParamList = {
  Home: undefined;
  Game: undefined;
  NewGame: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const AppNavigator: React.FC = () => (
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
);

export default AppNavigator;
