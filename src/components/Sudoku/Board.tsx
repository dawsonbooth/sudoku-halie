import React from "react";
import { Grid, Row, Col, View } from "native-base";
import Cell from "./Cell";

interface PropTypes {
    grid: Sudoku.Game["board"];
    size: number;
    select: Function;
}

export default function Board({ grid, size, select }: PropTypes) {
    return (
        <View style={{ height: size, width: size }}>
            <Grid>
                {grid.map((row: Sudoku.Cell[], i: React.ReactText) => (
                    <Row key={i}>
                        {row.map((cell: Sudoku.Cell, j: React.ReactText) => (
                            <Col key={j}>
                                <Cell
                                    value={cell.value}
                                    isSelected={cell.isSelected}
                                    fontSize={0.75 * (size / 9)}
                                    onPress={() => select(i, j)}
                                />
                            </Col>
                        ))}
                    </Row>
                ))}
            </Grid>
        </View>
    );
}
