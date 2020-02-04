import React, { useContext } from "react";
import { View } from "react-native";
import { Grid, Row, Col } from "react-native-easy-grid";
import Cell from "./Cell";
import { ColorsContext } from "./colors";

interface PropTypes {
  grid: Sudoku.Game["board"];
  handleCellPress: Function;
  size: number;
}

export default function Board({ grid, handleCellPress, size }: PropTypes) {
  const colors = useContext(ColorsContext);

  return (
    <View
      style={{
        height: size,
        width: size,
        padding: 0.05 * size
      }}
    >
      <Grid style={{ backgroundColor: colors.board.border, borderWidth: 2 }}>
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
    </View>
  );
}
