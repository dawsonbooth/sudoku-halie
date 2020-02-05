import React, { useContext } from "react";
import { Grid, Row, Col } from "react-native-easy-grid";
import Cell from "./Cell";
import { ColorsContext } from "./colors";

interface PropTypes {
  grid: Sudoku.Game["board"];
  handleCellPress: Function;
  size: number;
}

const Board: React.FC<PropTypes> = ({ grid, handleCellPress, size }) => {
  const colors = useContext(ColorsContext);

  return (
    <Grid
      style={{
        maxHeight: size,
        maxWidth: size,
        backgroundColor: colors.board.border,
        margin: 0.05 * size,
        borderWidth: 2,
        borderColor: colors.board.border
      }}
    >
      {grid.map((row: Sudoku.Cell[], r: Sudoku.Location["row"]) => (
        <Row key={r}>
          {row.map((cell: Sudoku.Cell, c: Sudoku.Location["col"]) => (
            <Col key={c}>
              <Cell
                row={r}
                column={c}
                {...cell}
                onPress={() => handleCellPress({ row: r, col: c })}
                boardSize={size}
              />
            </Col>
          ))}
        </Row>
      ))}
    </Grid>
  );
};

export default Board;
