import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Grid, Row, Col } from "react-native-easy-grid";
import Cell from "./Cell";
import { ColorsContext } from "./colors";
import * as Sudoku from "./types";

interface PropTypes {
  board: Sudoku.Game["board"];
  handleCellPress: Function;
  size: number;
}

const Board: React.FC<PropTypes> = ({ board, handleCellPress, size }) => {
  const colors = useContext(ColorsContext);

  const styles = StyleSheet.create({
    grid: {
      maxHeight: size,
      maxWidth: size,
      margin: 0.05 * size,
      borderWidth: 2,
      borderColor: colors.board.border
    }
  });

  return (
    <Grid style={styles.grid}>
      {board.map((row: Sudoku.Cell[], r: Sudoku.Location["row"]) => (
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
