import React from "react";
import { Alert, ImageProps } from "react-native";
import { TopNavigationAction, Icon } from "@ui-kitten/components";
import { useGame } from "../redux";
import i18n from "i18n-js";
import { useNavigation } from "@react-navigation/native";

const BackIcon: React.FC<Partial<ImageProps>> = (style) => (
  <Icon {...style} name="arrow-ios-back" />
);

const PencilIcon: React.FC<Partial<ImageProps>> = (style) => (
  <Icon {...style} name="edit" />
);

const SettingsIcon: React.FC<Partial<ImageProps>> = (style) => (
  <Icon {...style} name="settings" />
);

export const BackButton: React.FC = () => {
  const { goBack } = useNavigation();

  return <TopNavigationAction onPress={() => goBack()} icon={BackIcon} />;
};

export const NewGameButton: React.FC = () => {
  const { endGame } = useGame();
  const { navigate } = useNavigation();

  return (
    <TopNavigationAction
      onPress={() =>
        Alert.alert(
          i18n.t("alert.newGame.title"),
          i18n.t("alert.newGame.message"),
          [
            {
              text: i18n.t("alert.cancel"),
              style: "cancel",
            },
            {
              text: i18n.t("alert.ok"),
              onPress: () => {
                endGame();
                navigate("NewGame");
              },
            },
          ],
          { cancelable: false }
        )
      }
      icon={PencilIcon}
    />
  );
};

export const SettingsButton: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <TopNavigationAction
      onPress={() => navigate("Settings")}
      icon={SettingsIcon}
    />
  );
};
