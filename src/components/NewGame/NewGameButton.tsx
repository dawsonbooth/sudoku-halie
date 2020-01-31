import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { strings } from "../../constants";
import { Alert } from "react-native";
import { Icon, TopNavigationAction } from "@ui-kitten/components";

const PencilIcon = style => <Icon {...style} name="edit" />;

export default function NewGameButton() {
  const dispatch = useDispatch();

  const endGame = useCallback(
    () =>
      dispatch({
        type: "END_GAME"
      }),
    [dispatch]
  );

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
}
