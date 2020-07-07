import React from "react";
import { View } from "react-native";
import {
  Layout,
  Toggle,
  Text,
  Button,
  ListItem,
  List,
} from "@ui-kitten/components";
import NewGameButton from "./NewGameButton";
import Slider from "../../../components/Slider";
import { useSettings, useGame } from "../../../redux";
import i18n from "i18n-js";

const NewGame: React.FC & { Button: React.FC } = () => {
  const { settings, changeSettings } = useSettings();
  const { startGame } = useGame();

  const difficulties = [
    i18n.t("game.newGame.easy"),
    i18n.t("game.newGame.medium"),
    i18n.t("game.newGame.hard"),
  ];

  const difficulty =
    difficulties[
      Math.round(
        (1 - settings.sudoku.prefilledRatio) * (difficulties.length - 1)
      )
    ];

  const data = [
    "dotNotes",
    "showCompleted",
    "showPeers",
    "showEqual",
    "showConflicts",
  ];

  const renderItem = ({ item }) => (
    <ListItem
      title={i18n.t(`settings.sudoku.items.${item}`)}
      accessoryRight={(evaProps) => (
        <Toggle
          {...evaProps}
          checked={settings.sudoku[item]}
          onChange={(value) => changeSettings(settings.sudoku, item, value)}
        />
      )}
      onPress={() =>
        changeSettings(settings.sudoku, item, !settings.sudoku[item])
      }
    />
  );

  return (
    <Layout>
      <View style={{ padding: 10 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <Text>{`Difficulty: ${difficulty}`}</Text>
          <Text>
            Prefilled:
            {` ${Math.round(settings.sudoku.prefilledRatio * 100)}%`}
          </Text>
        </View>
        <Slider
          value={settings.sudoku.prefilledRatio}
          onComplete={(value) =>
            changeSettings(settings.sudoku, "prefilledRatio", value)
          }
        />
        <List data={data} renderItem={renderItem} scrollEnabled={false} />
      </View>
      <Button onPress={startGame} style={{ margin: 10 }}>
        {i18n.t("game.newGame.button")}
      </Button>
    </Layout>
  );
};

NewGame.Button = NewGameButton;

export default NewGame;
