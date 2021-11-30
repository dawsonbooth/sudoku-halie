import React, { useContext } from "react";
import { ColorsContext } from "../colors";
import { GestureResponderEvent } from "react-native";
import Notes from "./Notes";
import * as Sudoku from "../types";
import styled from "styled-components/native";
import { Store, useStore } from "../../state";

const Button = styled.TouchableOpacity<{
  degree: number;
  row: number;
  column: number;
  backgroundColor: string;
  borderColor: string;
}>`
  flex: 1;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-top-width: ${({ row, degree }) =>
    row % Math.sqrt(degree) == 0 ? 2 : 1}px;
  border-left-width: ${({ column, degree }) =>
    column % Math.sqrt(degree) == 0 ? 2 : 1}px;
  border-bottom-width: ${({ row, degree }) =>
    (row + 1) % Math.sqrt(degree) == 0 ? 2 : 1}px;
  border-right-width: ${({ column, degree }) =>
    (column + 1) % Math.sqrt(degree) == 0 ? 2 : 1}px;
  border-color: ${({ borderColor }) => borderColor};
  align-items: center;
  justify-content: center;
`;

const Value = styled.Text<{
  degree: number;
  boardSize: number;
  isPrefilled: boolean;
  color: string;
}>`
  color: ${({ color }) => color};
  font-size: ${({ boardSize, degree }) => 0.75 * (boardSize / degree)}px;
  font-weight: ${(isPrefilled) => (isPrefilled ? "bold" : "normal")};
`;

interface CellProps extends Sudoku.Cell {
  row: number;
  column: number;
  onPress: (event: GestureResponderEvent) => void;
  boardSize: number;
}

const selector = (state: Store) => ({
  degree: state.game?.degree,
  ...state.settings.sudoku,
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
  const { degree, showPeers, showCompleted, showEqual, showConflicts } =
    useStore(selector);

  const colors = useContext(ColorsContext);

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
