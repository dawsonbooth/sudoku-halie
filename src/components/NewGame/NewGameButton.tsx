import React from "react";
import { strings } from "../../constants";
import { Alert } from "react-native";
import { Icon, TopNavigationAction } from "@ui-kitten/components";
import { useGame } from "../../redux";

const PencilIcon = style => <Icon {...style} name="edit" />;

const NewGameButton: React.FC = () => {
  const { endGame } = useGame();

  return (
    <TopNavigationAction
      onPress={() =>
        Alert.alert(
          strings.alert.newGame.title,
          strings.alert.newGame.message,
          [
            {
              text: strings.alert.cancel,
              style: "cancel"
            },
            {
              text: strings.alert.ok,
              onPress: endGame
            }
          ],
          { cancelable: false }
        )
      }
      icon={PencilIcon}
    />
  );
};

export default NewGameButton;
