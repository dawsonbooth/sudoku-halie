import React, { useContext } from "react";
import { ColorsContext } from "./colors";
import { SettingsContext } from "./settings";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import Notes from "./Notes";

interface PropTypes extends Sudoku.Cell {
  row: number;
  column: number;
  onPress: (event: GestureResponderEvent) => void;
  boardSize: number;
}

const Cell: React.FC<PropTypes> = ({
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
}) => {
  const colors = useContext(ColorsContext);
  const settings = useContext(SettingsContext);

  let backgroundColor = colors.board.cell.normal;
  if (isPeer && settings.showPeers) backgroundColor = colors.board.cell.peer;
  if (isCompleted && settings.showCompleted)
    backgroundColor = colors.board.cell.completed;
  if (isEqual && settings.showEqual) backgroundColor = colors.board.cell.equal;
  if (isConflict && settings.showConflicts)
    backgroundColor = colors.board.cell.conflict;
  if (isSelected) backgroundColor = colors.board.cell.selected;

  const styles = StyleSheet.create({
    cell: {
      flex: 1,
      backgroundColor,
      borderTopWidth: row % Math.sqrt(settings.degree) == 0 ? 2 : 1,
      borderLeftWidth: column % Math.sqrt(settings.degree) == 0 ? 2 : 1,
      borderBottomWidth: (row + 1) % Math.sqrt(settings.degree) == 0 ? 2 : 1,
      borderRightWidth: (column + 1) % Math.sqrt(settings.degree) == 0 ? 2 : 1,
      borderColor: colors.board.border,
      alignItems: "center",
      justifyContent: "center"
    },
    text: {
      color: colors.text,
      fontSize: 0.75 * (boardSize / settings.degree),
      fontWeight: isPrefilled ? "bold" : "normal"
    }
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.cell}>
      {value ? (
        <Text allowFontScaling={false} style={styles.text}>
          {value}
        </Text>
      ) : notes[0] ? (
        <Notes notes={notes} size={boardSize} />
      ) : null}
    </TouchableOpacity>
  );
};

export default Cell;
