import React from "react";
import { View, SafeAreaView } from "react-native";
import { Layout, Text, Toggle, ListItem, List } from "@ui-kitten/components";
import Header from "../components/Header";
import { useSettings } from "../redux";
import i18n from "i18n-js";
import { BackButton } from "../navigation/buttons";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "../navigation/AppNavigator";

interface SettingsProps {
  navigation: StackNavigationProp<StackParamList>;
}

const Settings: React.FC<SettingsProps> = () => {
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

  const { settings, changeSettings } = useSettings();

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
        <Toggle
          {...evaProps}
          checked={item.value}
          onChange={(value) => changeSettings(settings.app, item.key, value)}
        />
      )}
      onPress={() => changeSettings(settings.app, item.key, !item.value)}
    />
  );

  const renderSudokuItem = ({ item }) => (
    <ListItem
      title={item.title}
      accessoryRight={(evaProps) => (
        <Toggle
          {...evaProps}
          checked={item.value}
          onChange={(value) => changeSettings(settings.sudoku, item.key, value)}
        />
      )}
      onPress={() => changeSettings(settings.sudoku, item.key, !item.value)}
    />
  );

  return (
    <Layout>
      <SafeAreaView style={{ height: "100%", width: "100%" }}>
        <Header title={strings.title} accessoryLeft={() => <BackButton />} />
        <Layout>
          <View style={{ padding: 10 }}>
            <Text category="h6">{strings.app.header}</Text>
            <List
              data={appData}
              renderItem={renderAppItem}
              scrollEnabled={false}
            />
            <Text category="h6">{strings.sudoku.header}</Text>
            <List
              data={sudokuData}
              renderItem={renderSudokuItem}
              scrollEnabled={false}
            />
          </View>
        </Layout>
      </SafeAreaView>
    </Layout>
  );
};

export default Settings;
