import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import Cell from "./Cell";
import { ColorsContext } from "../colors";
import * as Sudoku from "../types";

interface PropTypes {
  board: Sudoku.Game["board"];
  handleCellPress: Function;
  size: number;
}

const Board: React.FC<PropTypes> = ({ board, handleCellPress, size }) => {
  const colors = useContext(ColorsContext);

  const styles = StyleSheet.create({
    grid: {
      display: "flex",
      flexDirection: "column",

      height: size,
      margin: 0.05 * size,
      borderWidth: 2,
      borderColor: colors.board.border,
    },
    row: {
      flex: 1,
      flexDirection: "row",
    },
  });

  return (
    <View style={styles.grid}>
      {board.map((row: Sudoku.Cell[], r: Sudoku.Location["row"]) => (
        <View key={r} style={styles.row}>
          {row.map((cell: Sudoku.Cell, c: Sudoku.Location["col"]) => (
            <Cell
              key={c}
              row={r}
              column={c}
              {...cell}
              onPress={() => handleCellPress({ row: r, col: c })}
              boardSize={size}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

export default Board;
