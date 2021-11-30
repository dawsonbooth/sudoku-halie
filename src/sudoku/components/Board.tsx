import React, { useContext } from "react";
import { PixelRatio } from "react-native";
import Cell from "./Cell";
import { ColorsContext } from "../colors";
import * as Sudoku from "../types";
import styled from "styled-components/native";
import { Store, useStore } from "../../state";

const Grid = styled.View`
  ${({ size, borderColor }: { size: number; borderColor: string }) => `
    display: flex;
    flex-direction: column;
    height: ${size}px;
    margin: ${PixelRatio.roundToNearestPixel(0.05 * size)}px;
    border-width: 2px;
    border-color: ${borderColor};  
`}
`;

const Row = styled.View`
  flex: 1;
  flex-direction: row;
`;

interface BoardProps {
  size: number;
}

const selector = (state: Store) => ({
  board: state.game?.board,
  handleCellPress: state.handleCellPress,
});

const Board: React.FC<BoardProps> = ({ size }) => {
  const colors = useContext(ColorsContext);
  const { board, handleCellPress } = useStore(selector);

  if (!board) return null;

  return (
    <Grid size={size} borderColor={colors.board.border}>
      {board.map((row: Sudoku.Cell[], r: Sudoku.Location["row"]) => (
        <Row key={`board-row-${r}`}>
          {row.map((cell: Sudoku.Cell, c: Sudoku.Location["col"]) => (
            <Cell
              key={`board-cell-${c}`}
              row={r}
              column={c}
              {...cell}
              onPress={() => handleCellPress({ row: r, col: c })}
              boardSize={size}
            />
          ))}
        </Row>
      ))}
    </Grid>
  );
};

export default Board;
