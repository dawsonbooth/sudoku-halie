import { StackNavigationProp } from "@react-navigation/stack";
import { CheckBox, List, ListItem, Text } from "@ui-kitten/components";
import i18n from "i18n-js";
import produce from "immer";
import React from "react";
import { ListRenderItem } from "react-native";
import Screen from "../../components/Screen";
import { StackParamList } from "../../navigation/AppNavigator";
import { BackButton } from "../../navigation/buttons";
import {
  Settings as SettingsStateInterface,
  Store,
  useStore,
} from "../../state";
import { Wrapper } from "./styles";

type SettingsInterface = Omit<SettingsStateInterface, "sudoku"> & {
  sudoku: Omit<SettingsStateInterface["sudoku"], "degree" | "prefilledRatio">;
};

interface SettingsRowProps {
  label: string;
  value: boolean;
  onValueChange: (v: this["value"]) => void;
}

const SettingsRow: ListRenderItem<SettingsRowProps> = ({
  item: { label, value, onValueChange },
}) => {
  if (typeof value === "boolean") {
    const onToggle = () => onValueChange(!value);
    return (
      <ListItem
        title={label}
        accessoryRight={(evaProps) => (
          <CheckBox {...evaProps} checked={value} onChange={onToggle} />
        )}
        onPress={onToggle}
      />
    );
  }
  return <></>;
};

interface SettingsProps {
  navigation: StackNavigationProp<StackParamList>;
}

interface SettingData<S extends SettingsInterface[keyof SettingsInterface]> {
  label: string;
  value: S[keyof S];
  onValueChange: (value: S[keyof S]) => void;
}

type Labels = {
  title: string;
} & {
  [S in keyof SettingsInterface]: {
    header: string;
    items: { [K in keyof SettingsInterface[S]]: string };
  };
};

const selector = (state: Store) => ({
  settings: state.settings,
  updateSettings: state.updateSettings,
});

const useLabels = (): Labels => {
  return {
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
};

const Settings: React.FC<SettingsProps> = () => {
  const { settings, updateSettings } = useStore(selector);

  const labels = useLabels();

  const appData: SettingData<SettingsInterface["app"]>[] = Object.entries(
    settings.app
  ).map((entry) => {
    const [key, value] = entry as Entry<SettingsInterface["app"]>;
    return {
      label: labels.app.items[key],
      value,
      onValueChange: (v) =>
        updateSettings(
          produce(settings, (draft) => {
            draft.app[key] = v;
          })
        ),
    };
  });

  const sudokuData: SettingData<SettingsInterface["sudoku"]>[] = Object.entries(
    settings.sudoku
  ).map((entry) => {
    const [key, value] = entry as Entry<SettingsInterface["sudoku"]>;
    return {
      label: labels.sudoku.items[key],
      value,
      onValueChange: (v) =>
        updateSettings(
          produce(settings, (draft) => {
            draft.sudoku[key] = v;
          })
        ),
    };
  });

  return (
    <Screen title={labels.title} headerLeft={BackButton}>
      <Wrapper>
        <Text category="h6">{labels.app.header}</Text>
        <List data={appData} renderItem={SettingsRow} scrollEnabled={false} />
        <Text category="h6">{labels.sudoku.header}</Text>
        <List
          data={sudokuData}
          renderItem={SettingsRow}
          scrollEnabled={false}
        />
      </Wrapper>
    </Screen>
  );
};

export default Settings;
