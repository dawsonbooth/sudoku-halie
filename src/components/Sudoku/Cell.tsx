import React, { useState } from "react";
import { GestureResponderEvent, TouchableOpacity } from "react-native";
import { Text } from "native-base";
import { colors } from "../../constants";

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

function getBackgroundColor( // TODO: Color logic in ancestor, make modular
    isSelected: boolean,
    isPeer: boolean,
    isEqual: boolean,
    hasConflict: boolean
) {
    let backgroundColor = colors.SUDOKU.BOARD.CELL.BACKGROUND.NORMAL;
    if (isSelected)
        backgroundColor = colors.SUDOKU.BOARD.CELL.BACKGROUND.SELECTED;
    else if (isPeer) backgroundColor = colors.SUDOKU.BOARD.CELL.BACKGROUND.PEER;
    if (isEqual) backgroundColor = colors.SUDOKU.BOARD.CELL.BACKGROUND.EQUAL;
    if (hasConflict)
        backgroundColor = colors.SUDOKU.BOARD.CELL.BACKGROUND.CONFLICT;

    return backgroundColor;
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

    const backgroundColor = getBackgroundColor(
        isSelected,
        isPeer,
        isEqual,
        hasConflict
    );

    return (
        <TouchableOpacity
            onLayout={e => setFontSize(0.75 * e.nativeEvent.layout.height)}
            onPress={onPress}
            style={{
                flex: 1,
                backgroundColor,
                borderWidth: 1,
                borderColor: colors.SUDOKU.BOARD.BORDER,
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <Text
                style={{
                    color: isPrefilled
                        ? colors.SUDOKU.BOARD.CELL.NUMBER.PREFILLED
                        : colors.SUDOKU.BOARD.CELL.NUMBER.ENTRY,
                    fontSize
                }}
            >
                {value}
            </Text>
        </TouchableOpacity>
    );
}
