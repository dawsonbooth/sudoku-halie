import React from "react";
import { GestureResponderEvent, PixelRatio } from "react-native";
import ProgressCircle from "react-native-progress-circle";
import { useTheme } from "styled-components/native";
import { Store, useStore } from "../../../state";
import { Button, Note, Number } from "./styles";

interface NumberButtonProps {
  number: number;
  percent: number;
  radius: number;
  notesMode: boolean;
  onPress: (event: GestureResponderEvent) => void;
}

const selector = (state: Store) => state.settings.app.darkMode;

const NumberButton: React.FC<NumberButtonProps> = ({
  number,
  percent,
  radius,
  notesMode,
  onPress,
}) => {
  const darkMode = useStore(selector);
  const theme = useTheme();

  return (
    <Button onPress={onPress} radius={radius}>
      {notesMode ? (
        <Note allowFontScaling={false} radius={radius}>
          {number}
        </Note>
      ) : (
        <ProgressCircle
          percent={percent}
          radius={PixelRatio.roundToNearestPixel(radius)}
          borderWidth={radius / 4}
          color={
            percent < 100
              ? darkMode
                ? theme["color-primary-hover"]
                : theme["color-info-hover"]
              : theme["color-success-hover"]
          }
          shadowColor={
            darkMode
              ? theme["background-basic-color-2"]
              : theme["background-basic-color-4"]
          }
          bgColor={theme["background-basic-color-1"]}
        >
          <Number allowFontScaling={false} radius={radius}>
            {number}
          </Number>
        </ProgressCircle>
      )}
    </Button>
  );
};

export default NumberButton;
