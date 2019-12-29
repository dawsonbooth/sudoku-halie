import React, { useContext } from "react";
import { ColorsContext } from "./colors";
import { SettingsContext } from "./settings";
import {
    GestureResponderEvent,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { Text } from "native-base";
import Notes from "./Notes";

interface PropTypes extends Sudoku.Cell {
    row: number;
    column: number;
    onPress: (event: GestureResponderEvent) => void;
    boardSize: number;
}

export default function Cell({
    row,
    column,
    value,
    notes,
    isPrefilled,
    isCompleted,
    isSelected,
    isPeer,
    isEqual,
    isConflict,
    onPress,
    boardSize
}: PropTypes) {
    const colors = useContext(ColorsContext);
    const settings = useContext(SettingsContext);

    let backgroundColor = colors.board.cell.background.normal;
    if (isPrefilled) backgroundColor = colors.board.cell.background.prefilled;
    if (isPeer && settings.showPeers)
        backgroundColor = colors.board.cell.background.peer;
    if (isCompleted && settings.showCompleted)
        backgroundColor = colors.board.cell.background.completed;
    if (isEqual && settings.showEqual)
        backgroundColor = colors.board.cell.background.equal;
    if (isConflict && settings.showConflicts)
        backgroundColor = colors.board.cell.background.conflict;
    if (isSelected) backgroundColor = colors.board.cell.background.selected;

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
            color: colors.board.cell.number.entry,
            fontSize: 0.75 * (boardSize / settings.degree)
        }
    });

    return (
        <TouchableOpacity onPress={onPress} style={styles.cell}>
            {value ? (
                <Text style={styles.text}>{value}</Text>
            ) : notes[0] ? (
                <Notes notes={notes} size={boardSize} />
            ) : null}
        </TouchableOpacity>
    );
}
