import React, { useContext } from "react";
import { ColorsContext } from "../colors";
import { GestureResponderEvent, PixelRatio } from "react-native";
import ProgressCircle from "react-native-progress-circle";
import styled from "styled-components/native";

const Button = styled.TouchableOpacity`
  ${({ radius }: { radius: number }) => `
    margin: ${radius / 5}px;
  `}
`;

const Note = styled.Text`
  ${({ radius, color }: { radius: number; color: string }) => `
    margin-horizontal: ${radius * 0.4}px;
    font-size: ${radius * 2}px;
    color: ${color};
  `}
`;

const Number = styled.Text`
  ${({ radius, color }: { radius: number; color: string }) => `
    font-size: ${radius * 1.25}px;
    color: ${color};
  `}
`;

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
  onPress,
}) => {
  const colors = useContext(ColorsContext);

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
