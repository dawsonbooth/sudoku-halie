import React, { useContext } from "react";
import { ColorsContext } from "../colors";
import { SettingsContext } from "../settings";
import { GestureResponderEvent } from "react-native";
import Notes from "./Notes";
import * as Sudoku from "../types";
import styled from "styled-components/native";

const Button = styled.TouchableOpacity`
  ${({
    degree,
    row,
    column,
    backgroundColor,
    borderColor,
  }: {
    degree: number;
    row: number;
    column: number;
    backgroundColor: string;
    borderColor: string;
  }) => `
  flex: 1;
  background-color: ${backgroundColor};
  border-top-width: ${row % Math.sqrt(degree) == 0 ? 2 : 1}px;
  border-left-width: ${column % Math.sqrt(degree) == 0 ? 2 : 1}px;
  border-bottom-width: ${(row + 1) % Math.sqrt(degree) == 0 ? 2 : 1}px;
  border-right-width: ${(column + 1) % Math.sqrt(degree) == 0 ? 2 : 1}px;
  border-color: ${borderColor};
  align-items: center;
  justify-content: center
  `}
`;

const Value = styled.Text`
  ${({
    degree,
    boardSize,
    isPrefilled,
    color,
  }: {
    degree: number;
    boardSize: number;
    isPrefilled: boolean;
    color: string;
  }) => `
  color: ${color};
  font-size: ${0.75 * (boardSize / degree)}px;
  font-weight: ${isPrefilled ? "bold" : "normal"}
  `}
`;

interface CellProps extends Sudoku.Cell {
  row: number;
  column: number;
  onPress: (event: GestureResponderEvent) => void;
  boardSize: number;
}

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

  return (
    <Button
      onPress={onPress}
      degree={settings.degree}
      row={row}
      column={column}
      backgroundColor={backgroundColor}
      borderColor={colors.board.border}
    >
      {value ? (
        <Value
          allowFontScaling={false}
          degree={settings.degree}
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
