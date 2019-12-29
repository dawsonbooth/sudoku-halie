import React from "react";
import { Grid, Row, Col, View } from "native-base";
import Cell from "./Cell";

interface PropTypes {
    grid: Sudoku.Game["board"];
    handleCellPress: Function;
    size: number;
}

export default function Board({ grid, handleCellPress, size }: PropTypes) {
    const boardSize = 0.95 * size;

    return (
        <View
            style={{ height: boardSize, width: boardSize, margin: 0.05 * size }}
        >
            <Grid>
                {grid.map((row: Sudoku.Cell[], r: Sudoku.Location["row"]) => (
                    <Row key={r}>
                        {row.map(
                            (cell: Sudoku.Cell, c: Sudoku.Location["col"]) => (
                                <Col key={c}>
                                    <Cell
                                        row={r}
                                        column={c}
                                        {...cell}
                                        onPress={() =>
                                            handleCellPress({ row: r, col: c })
                                        }
                                        boardSize={boardSize}
                                    />
                                </Col>
                            )
                        )}
                    </Row>
                ))}
            </Grid>
        </View>
    );
}
