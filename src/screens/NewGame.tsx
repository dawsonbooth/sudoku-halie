import React, { useState } from "react";
import { View, SafeAreaView } from "react-native";
import {
  Layout,
  Toggle,
  Text,
  Button,
  ListItem,
  List,
} from "@ui-kitten/components";
import Slider from "../components/Slider";
import { useSettings, useGame } from "../redux";
import i18n from "i18n-js";
import Header from "../components/Header";
import { SettingsButton } from "../navigation/buttons";

interface PropTypes {
  navigation: any;
}

const NewGame: React.FC<PropTypes> = ({ navigation }) => {
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
      <SafeAreaView style={{ height: "100%", width: "100%" }}>
        <Header
          title={i18n.t("newGame.title")}
          accessoryLeft={() => <SettingsButton />}
        />
        <Layout>
          <View style={{ padding: 10 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <Text>{`Difficulty: ${difficulty}`}</Text>
              <Text>
                Prefilled:
                {` ${Math.round(prefilledRatio * 100)}%`}
              </Text>
            </View>
            <Slider
              value={settings.sudoku.prefilledRatio}
              onChange={setPrefilledRatio}
              onComplete={(value) =>
                changeSettings(settings.sudoku, "prefilledRatio", value)
              }
            />
            <List data={data} renderItem={renderItem} scrollEnabled={false} />
          </View>
          <Button
            onPress={() => {
              startGame();
              navigation.navigate("Game");
            }}
            style={{ margin: 10 }}
          >
            {i18n.t("newGame.button")}
          </Button>
        </Layout>
      </SafeAreaView>
    </Layout>
  );
};

export default NewGame;
