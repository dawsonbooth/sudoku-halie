import React, { useState } from "react";
import { Text, Button, ListItem, List, CheckBox } from "@ui-kitten/components";
import Slider from "../components/Slider";
import { useSettings, useGame } from "../redux";
import i18n from "i18n-js";
import { SettingsButton } from "../navigation/buttons";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "../navigation/AppNavigator";
import Screen from "../components/Screen";
import styled from "styled-components/native";

const Container = styled.View`
  padding: 10px;
`;

const SliderLabel = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const options = [
  "dotNotes",
  "showCompleted",
  "showPeers",
  "showEqual",
  "showConflicts",
];

interface NewGameProps {
  navigation: StackNavigationProp<StackParamList>;
}

const NewGame: React.FC<NewGameProps> = ({ navigation }) => {
  const { settings, changeSettings } = useSettings();
  const { startGame } = useGame();

  const [prefilledRatio, setPrefilledRatio] = useState<number>(
    settings.sudoku.prefilledRatio
  );

  const difficulties = [
    i18n.t("newGame.easy"),
    i18n.t("newGame.medium"),
    i18n.t("newGame.hard"),
  ];

  const difficulty =
    difficulties[Math.round((1 - prefilledRatio) * (difficulties.length - 1))];

  const renderItem = ({ item }) => (
    <ListItem
      title={i18n.t(`settings.sudoku.items.${item}`)}
      accessoryRight={(evaProps) => (
        <CheckBox
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
    <Screen title={i18n.t("newGame.title")} headerLeft={SettingsButton}>
      <Container>
        <SliderLabel>
          <Text>{`Difficulty: ${difficulty}`}</Text>
          <Text>
            Prefilled:
            {` ${Math.round(prefilledRatio * 100)}%`}
          </Text>
        </SliderLabel>
        <Slider
          value={settings.sudoku.prefilledRatio}
          onChange={setPrefilledRatio}
          onComplete={(value) =>
            changeSettings(settings.sudoku, "prefilledRatio", value)
          }
        />
        <List data={options} renderItem={renderItem} scrollEnabled={false} />
        <Button
          onPress={() => {
            startGame();
            navigation.navigate("Game");
          }}
        >
          {i18n.t("newGame.button")}
        </Button>
      </Container>
    </Screen>
  );
};

export default NewGame;
