import { useTheme } from "@ui-kitten/components";
import React from "react";
import { GestureResponderEvent } from "react-native";
import { Store, useStore } from "../../../state";
import * as Sudoku from "../../types";
import Notes from "../notes";
import { Button, Value } from "./styles";

interface CellProps extends Sudoku.Cell {
  row: number;
  column: number;
  onPress: (event: GestureResponderEvent) => void;
  boardSize: number;
}

const selector = (state: Store) => ({
  degree: state.game?.degree,
  ...state.settings.sudoku,
  getColors: state.getColors,
});

const Cell: React.FC<CellProps> = ({
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
  boardSize,
}) => {
  const {
    degree,
    showPeers,
    showCompleted,
    showEqual,
    showConflicts,
    getColors,
  } = useStore(selector);

  const theme = useTheme();

  const colors = getColors(theme);

  if (!degree) return null;

  let backgroundColor = colors.board.cell.normal;
  if (isPeer && showPeers) backgroundColor = colors.board.cell.peer;
  if (isCompleted && showCompleted)
    backgroundColor = colors.board.cell.completed;
  if (isEqual && showEqual) backgroundColor = colors.board.cell.equal;
  if (isConflict && showConflicts) backgroundColor = colors.board.cell.conflict;
  if (isSelected) backgroundColor = colors.board.cell.selected;

  return (
    <Button
      onPress={onPress}
      degree={degree}
      row={row}
      column={column}
      backgroundColor={backgroundColor}
      borderColor={colors.board.border}
    >
      {value ? (
        <Value
          allowFontScaling={false}
          degree={degree}
          boardSize={boardSize}
          isPrefilled={isPrefilled}
          color={colors.text}
        >
          {value}
        </Value>
      ) : (
        notes[0] && <Notes notes={notes} size={boardSize} />
      )}
    </Button>
  );
};

export default Cell;
