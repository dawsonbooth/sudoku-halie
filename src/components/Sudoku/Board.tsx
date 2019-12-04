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
                {grid.map((row: Sudoku.Cell[], i: number) => (
                    <Row key={i}>
                        {row.map((cell: Sudoku.Cell, j: number) => (
                            <Col key={j}>
                                <Cell
                                    row={i}
                                    column={j}
                                    {...cell}
                                    onPress={() => handleCellPress(i, j)}
                                />
                            </Col>
                        ))}
                    </Row>
                ))}
            </Grid>
        </Card>
    );
}
