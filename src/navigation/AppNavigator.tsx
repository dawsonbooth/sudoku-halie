import React from "react";
import * as screens from "../screens";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { mapping, dark, light } from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { useSettings } from "../redux";
import { StatusBar } from "react-native";

const Container = createAppContainer(
  createSwitchNavigator(
    {
      Home: {
        screen: screens.Home
      },
      Game: {
        screen: screens.Game
      },
      Settings: {
        screen: screens.Settings
      }
    },
    {}
  )
);

const AppNavigator: React.FC = () => {
  const { settings } = useSettings();
  const darkMode = settings.app.darkMode;

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={darkMode ? dark : light}>
        <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} />
        <Container />
      </ApplicationProvider>
    </>
  );
};

export default AppNavigator;
