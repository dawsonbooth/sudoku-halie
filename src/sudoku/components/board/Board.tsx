import { useTheme } from "@ui-kitten/components";
import React from "react";
import { Store, useStore } from "../../../state";
import * as Sudoku from "../../types";
import Cell from "../cell";
import { Grid, Row } from "./styles";

interface BoardProps {
  size: number;
}

const selector = (state: Store) => ({
  board: state.game?.board,
  getColors: state.getColors,
  handleCellPress: state.handleCellPress,
});

const Board: React.FC<BoardProps> = ({ size }) => {
  const { board, getColors, handleCellPress } = useStore(selector);
  const theme = useTheme();
  const colors = getColors(theme);

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
