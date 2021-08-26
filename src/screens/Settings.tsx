import React from "react";
import styled from "styled-components/native";
import { Text, ListItem, List, CheckBox } from "@ui-kitten/components";
import { Store, useStore } from "../state";
import i18n from "i18n-js";
import { BackButton } from "../navigation/buttons";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "../navigation/AppNavigator";
import Screen from "../components/Screen";
import produce from "immer";

const Container = styled.View`
  padding: 10px;
`;

interface SettingsProps {
  navigation: StackNavigationProp<StackParamList>;
}

const selector = (store: Store) => ({
  settings: store.settings,
  updateSettings: store.updateSettings,
});

const Settings: React.FC<SettingsProps> = () => {
  const { settings, updateSettings } = useStore(selector);

  const strings = {
    title: i18n.t("settings.title"),
    app: {
      header: i18n.t("settings.app.header"),
      items: {
        darkMode: i18n.t("settings.app.items.darkMode"),
      },
    },
    sudoku: {
      header: i18n.t("settings.sudoku.header"),
      items: {
        dotNotes: i18n.t("settings.sudoku.items.dotNotes"),
        showCompleted: i18n.t("settings.sudoku.items.showCompleted"),
        showPeers: i18n.t("settings.sudoku.items.showPeers"),
        showEqual: i18n.t("settings.sudoku.items.showEqual"),
        showConflicts: i18n.t("settings.sudoku.items.showConflicts"),
      },
    },
  };

  const appData = Object.keys(strings.app.items).reduce((acc, key) => {
    return [
      ...acc,
      {
        title: strings.app.items[key],
        value: settings.app[key],
        key,
      },
    ];
  }, []);

  const sudokuData = Object.keys(strings.sudoku.items).reduce((acc, key) => {
    return [
      ...acc,
      {
        title: strings.sudoku.items[key],
        value: settings.sudoku[key],
        key,
      },
    ];
  }, []);

  const renderAppItem = ({ item }) => (
    <ListItem
      title={item.title}
      accessoryRight={(evaProps) => (
        <CheckBox
          {...evaProps}
          checked={item.value}
          onChange={(value) =>
            updateSettings(
              produce(settings, (draft) => {
                draft.app[item.key] = value;
              })
            )
          }
        />
      )}
      onPress={() =>
        updateSettings(
          produce(settings, (draft) => {
            draft.app[item.key] = !item.value;
          })
        )
      }
    />
  );

  const renderSudokuItem = ({ item }) => (
    <ListItem
      title={item.title}
      accessoryRight={(evaProps) => (
        <CheckBox
          {...evaProps}
          checked={item.value}
          onChange={(value) =>
            updateSettings(
              produce(settings, (draft) => {
                draft.sudoku[item.key] = value;
              })
            )
          }
        />
      )}
      onPress={() =>
        updateSettings(
          produce(settings, (draft) => {
            draft.sudoku[item.key] = !item.value;
          })
        )
      }
    />
  );

  return (
    <Screen title={strings.title} headerLeft={BackButton}>
      <Container>
        <Text category="h6">{strings.app.header}</Text>
        <List data={appData} renderItem={renderAppItem} scrollEnabled={false} />
        <Text category="h6">{strings.sudoku.header}</Text>
        <List
          data={sudokuData}
          renderItem={renderSudokuItem}
          scrollEnabled={false}
        />
      </Container>
    </Screen>
  );
};

export default Settings;
