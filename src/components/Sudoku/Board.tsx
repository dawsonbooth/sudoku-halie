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
                {grid.map((row: Sudoku.Cell[], i: React.ReactText) => (
                    <Row key={i}>
                        {row.map((cell: Sudoku.Cell, j: React.ReactText) => (
                            <Col key={j}>
                                <Cell
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
