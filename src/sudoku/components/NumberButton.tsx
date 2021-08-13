import React, { useContext } from "react";
import { ColorsContext } from "../colors";
import {
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  PixelRatio
} from "react-native";
import ProgressCircle from "react-native-progress-circle";

interface NumberButtonProps {
  number: number;
  percent: number;
  radius: number;
  notesMode: boolean;
  onPress: (event: GestureResponderEvent) => void;
}

const NumberButton: React.FC<NumberButtonProps> = ({
  number,
  percent,
  radius,
  notesMode,
  onPress
}) => {
  const colors = useContext(ColorsContext);

  return (
    <TouchableOpacity onPress={onPress} style={{ margin: radius / 5 }}>
      {notesMode ? (
        <Text
          allowFontScaling={false}
          style={{
            marginHorizontal: radius * 0.4,
            fontSize: radius * 2,
            color: colors.text
          }}
        >
          {number}
        </Text>
      ) : (
        <ProgressCircle
          percent={percent}
          radius={PixelRatio.roundToNearestPixel(radius)}
          borderWidth={radius / 4}
          color={
            percent < 100
              ? colors.controls.number_button.progress
              : colors.controls.number_button.completed
          }
          shadowColor={colors.controls.number_button.border}
          bgColor={colors.controls.number_button.background}
        >
          <Text
            allowFontScaling={false}
            style={{
              fontSize: radius * 1.25,
              color: colors.text
            }}
          >
            {number}
          </Text>
        </ProgressCircle>
      )}
    </TouchableOpacity>
  );
};

export default NumberButton;
