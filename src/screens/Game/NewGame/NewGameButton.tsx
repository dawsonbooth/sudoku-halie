import React from "react";
import { Alert, ImageProps } from "react-native";
import { Icon, TopNavigationAction } from "@ui-kitten/components";
import { useGame } from "../../../redux";
import i18n from "i18n-js";

const PencilIcon = (style: Partial<ImageProps>) => (
  <Icon {...style} name="edit" />
);

const NewGameButton: React.FC = () => {
  const { endGame } = useGame();

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
              onPress: endGame,
            },
          ],
          { cancelable: false }
        )
      }
      icon={PencilIcon}
    />
  );
};

export default NewGameButton;
