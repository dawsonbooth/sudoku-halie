import { useTheme } from "@ui-kitten/components";
import React from "react";
import { GestureResponderEvent, PixelRatio } from "react-native";
import ProgressCircle from "react-native-progress-circle";
import { Store, useStore } from "../../../state";
import { Button, Note, Number } from "./styles";

interface NumberButtonProps {
  number: number;
  percent: number;
  radius: number;
  notesMode: boolean;
  onPress: (event: GestureResponderEvent) => void;
}

const selector = (state: Store) => state.getColors;

const NumberButton: React.FC<NumberButtonProps> = ({
  number,
  percent,
  radius,
  notesMode,
  onPress,
}) => {
  const getColors = useStore(selector);
  const theme = useTheme();
  const colors = getColors(theme);

  return (
    <Button onPress={onPress} radius={radius}>
      {notesMode ? (
        <Note allowFontScaling={false} radius={radius} color={colors.text}>
          {number}
        </Note>
      ) : (
        <ProgressCircle
          percent={percent}
          radius={PixelRatio.roundToNearestPixel(radius)}
          borderWidth={radius / 4}
          color={
            percent < 100
              ? colors.controls.numberButton.progress
              : colors.controls.numberButton.completed
          }
          shadowColor={colors.controls.numberButton.border}
          bgColor={colors.controls.numberButton.background}
        >
          <Number allowFontScaling={false} radius={radius} color={colors.text}>
            {number}
          </Number>
        </ProgressCircle>
      )}
    </Button>
  );
};

export default NumberButton;
