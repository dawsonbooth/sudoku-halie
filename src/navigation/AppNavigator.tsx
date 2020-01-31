import React from "react";
import * as screens from "../screens";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { mapping, dark, light } from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { useSelector } from "react-redux";

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
  const darkMode = useSelector(
    (state: Redux.State) => state.settings.app.darkMode
  );

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={darkMode ? dark : light}>
        <Container />
      </ApplicationProvider>
    </>
  );
};

export default AppNavigator;
