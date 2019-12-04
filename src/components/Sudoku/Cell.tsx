import React, { useState, useContext } from "react";
import { ColorsContext } from "./colors";
import { SettingsContext } from "./settings";
import {
    GestureResponderEvent,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { Text } from "native-base";

interface PropTypes {
    row: number;
    column: number;
    value?: Sudoku.Cell["value"];
    notes?: Sudoku.Cell["notes"];
    isPrefilled?: Sudoku.Cell["isPrefilled"];
    isSelected?: Sudoku.Cell["isSelected"];
    isPeer?: Sudoku.Cell["isPeer"];
    isEqual?: Sudoku.Cell["isEqual"];
    hasConflict?: Sudoku.Cell["hasConflict"];
    onPress: (event: GestureResponderEvent) => void;
}

export default function Cell({
    row,
    column,
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
    const settings = useContext(SettingsContext);

    let backgroundColor = colors.board.cell.background.normal;
    if (isSelected) backgroundColor = colors.board.cell.background.selected;
    else if (isPeer) backgroundColor = colors.board.cell.background.peer;
    if (isEqual) backgroundColor = colors.board.cell.background.equal;
    if (hasConflict) backgroundColor = colors.board.cell.background.conflict;

    const styles = StyleSheet.create({
        cell: {
            flex: 1,
            backgroundColor,
            borderTopWidth: row % Math.sqrt(settings.degree) == 0 ? 2 : 1,
            borderLeftWidth: column % Math.sqrt(settings.degree) == 0 ? 2 : 1,
            borderBottomWidth:
                (row + 1) % Math.sqrt(settings.degree) == 0 ? 2 : 1,
            borderRightWidth:
                (column + 1) % Math.sqrt(settings.degree) == 0 ? 2 : 1,
            borderColor: colors.board.border,
            alignItems: "center",
            justifyContent: "center"
        },
        text: {
            color: isPrefilled
                ? colors.board.cell.number.prefilled
                : colors.board.cell.number.entry,
            fontSize
        }
    });

    return (
        <TouchableOpacity
            onLayout={e => setFontSize(0.75 * e.nativeEvent.layout.height)}
            onPress={onPress}
            style={styles.cell}
        >
            <Text style={styles.text}>{value}</Text>
        </TouchableOpacity>
    );
}
