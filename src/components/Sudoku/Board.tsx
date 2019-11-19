import React from 'react';
import Cell from './Cell';
import { Grid, Row, Col, View } from 'native-base';

interface PropTypes {
    grid: State["game"]["board"];
    size: number;
    select: Function;
}

export default function Board({ grid, size, select}: PropTypes) {

    return (
        <View style={{ height: size, width: size }}>
            <Grid >
                {grid.map((row: Cell[], i: React.ReactText) => (
                    <Row key={i}>
                        {row.map((cell: Cell, j: React.ReactText) => (
                            <Col key={j}>
                                <Cell value={cell.value} fontSize={.75 * (size / 9)} onPress={() => select(i, j)}/>
                            </Col>
                        ))}
                    </Row>
                ))}
            </Grid>
        </View>
    );


}