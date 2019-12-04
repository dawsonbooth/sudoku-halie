import React, { useContext } from "react";
import { ColorsContext } from "./colors"
import { TouchableOpacity, GestureResponderEvent } from "react-native";
import { Text } from "native-base";
import ProgressCircle from "react-native-progress-circle";

interface PropTypes {
    number: number;
    percent: number;
    radius: number;
    onPress: (event: GestureResponderEvent) => void;
}

export default function NumberButton({ number, percent, radius, onPress }: PropTypes) {
    const colors = useContext(ColorsContext);

    return (
        <TouchableOpacity onPress={onPress}>
            <ProgressCircle
                percent={percent}
                radius={radius}
                borderWidth={radius / 4}
                color={colors.controls.number_button.progress}
                shadowColor={colors.controls.number_button.border}
                bgColor={colors.controls.number_button.background}
            >
                <Text style={{fontSize: radius}}>{number}</Text>
            </ProgressCircle>
        </TouchableOpacity>
    );
}
