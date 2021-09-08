import React from "react";
import Sudoku from "../sudoku";
import { useTheme } from "@ui-kitten/components";
import { Store, useStore } from "../state";
import i18n from "i18n-js";
import { NewGameButton, SettingsButton } from "../navigation/buttons";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "../navigation/AppNavigator";
import Screen from "../components/Screen";

const colors = (darkMode: boolean, theme: Record<string, string>) => {
  if (darkMode) {
    return {
      text: theme["text-basic-color"],
      board: {
        border: theme["border-basic-color-4"],
        cell: {
          normal: theme["background-basic-color-1"],
          peer: theme["color-basic-700"],
          equal: theme["background-basic-color-2"],
          conflict: theme["color-danger-hover"],
          selected: theme["color-primary-hover"],
          completed: theme["color-success-hover"],
        },
      },
      controls: {
        numberButton: {
          background: theme["background-basic-color-1"],
          border: theme["background-basic-color-2"],
          progress: theme["color-primary-hover"],
          completed: theme["color-success-hover"],
        },
      },
    };
  } else
    return {
      text: theme["text-basic-color"],
      board: {
        border: theme["border-alternative-color-4"],
        cell: {
          normal: theme["background-basic-color-1"],
          peer: theme["color-info-200"],
          equal: theme["color-info-300"],
          conflict: theme["color-danger-300"],
          selected: theme["color-warning-200"],
          completed: theme["color-success-200"],
        },
      },
      controls: {
        numberButton: {
          background: theme["background-basic-color-1"],
          border: theme["background-basic-color-4"],
          progress: theme["color-info-hover"],
          completed: theme["color-success-hover"],
        },
      },
    };
};

interface GameProps {
  navigation: StackNavigationProp<StackParamList>;
}

const selector = (store: Store) => ({
  saveBoard: store.saveBoard,
  settings: store.settings,
});

const Game: React.FC<GameProps> = () => {
  const { saveBoard, settings } = useStore(selector);

  const theme = useTheme();

  return (
    <Screen
      title={i18n.t("game.title")}
      headerLeft={SettingsButton}
      headerRight={NewGameButton}
    >
      <Sudoku
        onChange={saveBoard}
        settings={settings.sudoku}
        colors={colors(settings.app.darkMode, theme)}
      />
    </Screen>
  );
};

export default Game;
