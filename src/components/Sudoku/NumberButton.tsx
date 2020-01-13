import React, { useContext } from "react";
import { ColorsContext } from "./colors";
import { Text, TouchableOpacity, GestureResponderEvent } from "react-native";
import ProgressCircle from "react-native-progress-circle";

interface PropTypes {
    number: number;
    percent: number;
    radius: number;
    notesMode: boolean;
    onPress: (event: GestureResponderEvent) => void;
}

export default function NumberButton({
    number,
    percent,
    radius,
    notesMode,
    onPress
}: PropTypes) {
    const colors = useContext(ColorsContext);

    return (
        <TouchableOpacity onPress={onPress} style={{ margin: radius / 5 }}>
            {notesMode ? (
                <Text
                    allowFontScaling={false}
                    style={{ fontSize: radius * 1.5 }}
                >
                    {number}
                </Text>
            ) : (
                <ProgressCircle
                    percent={percent}
                    radius={radius}
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
                        style={{ fontSize: radius * 1.25 }}
                    >
                        {number}
                    </Text>
                </ProgressCircle>
            )}
        </TouchableOpacity>
    );
}
