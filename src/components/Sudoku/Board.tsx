import React from "react";
import { Grid, Row, Col, Card } from "native-base";
import Cell from "./Cell";

interface PropTypes {
    grid: Sudoku.Game["board"];
    handleCellPress: Function;
    size: number;
}

export default function Board({ grid, handleCellPress, size }: PropTypes) {
    return (
        <Card style={{ height: 0.8 * size, width: 0.8 * size }}>
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
                                    />
                                </Col>
                            )
                        )}
                    </Row>
                ))}
            </Grid>
        </Card>
    );
}
