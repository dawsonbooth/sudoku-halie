import React from "react";
import { TouchableOpacity, GestureResponderEvent } from "react-native";
import { Text } from "native-base";
import ProgressCircle from "react-native-progress-circle";
import { colors } from '../../constants'

interface PropTypes {
    number: number;
    percent: number;
    radius: number;
    onPress: (event: GestureResponderEvent) => void;
}

export default function NumberButton({ number, percent, radius, onPress }: PropTypes) {
    return (
        <TouchableOpacity onPress={onPress}>
            <ProgressCircle
                percent={percent}
                radius={radius}
                borderWidth={radius / 4}
                color={colors.SUDOKU.CONTROLS.NUMBER_BUTTON.PROGRESS}
                shadowColor={colors.SUDOKU.CONTROLS.NUMBER_BUTTON.BORDER}
                bgColor={colors.SUDOKU.CONTROLS.NUMBER_BUTTON.BACKGROUND}
            >
                <Text style={{fontSize: radius}}>{number}</Text>
            </ProgressCircle>
        </TouchableOpacity>
    );
}
