import React from "react";
import Sudoku from "../sudoku";

import i18n from "i18n-js";
import { NewGameButton, SettingsButton } from "../navigation/buttons";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "../navigation/AppNavigator";
import Screen from "../components/Screen";

interface GameProps {
  navigation: StackNavigationProp<StackParamList>;
}

const Game: React.FC<GameProps> = () => {
  return (
    <Screen
      title={i18n.t("game.title")}
      headerLeft={SettingsButton}
      headerRight={NewGameButton}
    >
      <Sudoku />
    </Screen>
  );
};

export default Game;
