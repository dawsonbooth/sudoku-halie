import React, { useState, useContext } from "react";
import { ColorsContext } from "./colors";
import { GestureResponderEvent, TouchableOpacity } from "react-native";
import { Text } from "native-base";

interface PropTypes {
    value?: Sudoku.Cell["value"];
    notes?: Sudoku.Cell["notes"];
    isPrefilled?: boolean;
    isSelected?: Sudoku.Cell["isSelected"];
    isPeer?: boolean;
    isEqual?: boolean;
    hasConflict?: boolean;
    onPress: (event: GestureResponderEvent) => void;
}

export default function Cell({
    value,
    notes,
    isPrefilled,
    isSelected,
    isPeer,
    isEqual,
    hasConflict,
    onPress
}: PropTypes) {
    const [fontSize, setFontSize] = useState();
    const colors = useContext(ColorsContext);

    let backgroundColor = colors.board.cell.background.normal;
    if (isSelected) backgroundColor = colors.board.cell.background.selected;
    else if (isPeer) backgroundColor = colors.board.cell.background.peer;
    if (isEqual) backgroundColor = colors.board.cell.background.equal;
    if (hasConflict) backgroundColor = colors.board.cell.background.conflict;

    return (
        <TouchableOpacity
            onLayout={e => setFontSize(0.75 * e.nativeEvent.layout.height)}
            onPress={onPress}
            style={{
                flex: 1,
                backgroundColor,
                borderWidth: 1,
                borderColor: colors.board.border,
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <Text
                style={{
                    color: isPrefilled
                        ? colors.board.cell.number.prefilled
                        : colors.board.cell.number.entry,
                    fontSize
                }}
            >
                {value}
            </Text>
        </TouchableOpacity>
    );
}
