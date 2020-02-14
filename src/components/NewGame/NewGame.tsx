import React from "react";
import { strings } from "../../constants";
import { Slider, View } from "react-native";
import {
  Layout,
  Toggle,
  Text,
  Button,
  ListItem,
  List,
  Divider
} from "@ui-kitten/components";
import NewGameButton from "./NewGameButton";
import { useSettings, useGame } from "../../redux";

const NewGame: React.FC & { Button: React.FC } = () => {
  const { settings, changeSettings } = useSettings();
  const { startGame } = useGame();

  const difficulty =
    strings.game.newGame.difficulties[
      Math.round(
        (1 - settings.sudoku.prefilledRatio) *
          (strings.game.newGame.difficulties.length - 1)
      )
    ];

  const data = [
    "dotNotes",
    "showCompleted",
    "showPeers",
    "showEqual",
    "showConflicts"
  ];

  const renderItemAccessory = (style, index) => {
    const item = data[index];

    return (
      <Toggle
        style={style}
        checked={settings.sudoku[item]}
        onChange={value => changeSettings(settings.sudoku, item, value)}
      />
    );
  };

  const renderItem = ({ item }) => (
    <ListItem
      title={strings.settings.sudoku[item]}
      accessory={renderItemAccessory}
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
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#3466FF"
          value={settings.sudoku.prefilledRatio}
          onSlidingComplete={value =>
            changeSettings(settings.sudoku, "prefilledRatio", value)
          }
        />
        <Divider />
        <List data={data} renderItem={renderItem} scrollEnabled={false} />
      </View>
      <Button onPress={startGame} style={{ margin: 10 }}>
        {strings.game.newGame.button}
      </Button>
    </Layout>
  );
};

NewGame.Button = NewGameButton;

export default NewGame;
