import React, { useContext } from "react";
import { SettingsContext } from "./settings";
import { Grid, Row, Col, Card, Text } from "native-base";

interface PropTypes {
    notes: Sudoku.Cell["notes"];
    size: number;
}

export default function Board({ notes, size }: PropTypes) {
    const settings = useContext(SettingsContext);

    const fontSize = (0.75 / 3) * (size / settings.degree);

    const unit = Math.sqrt(settings.degree);
    const notesGrid = [...Array(unit)].map(() =>
        [...Array(unit)].map(() => false)
    );

    notes.forEach((isNote, i) => {
        if (i !== 0)
            notesGrid[Math.floor((i - 1) / unit)][(i - 1) % unit] = isNote;
    });

    return (
        <Grid>
            {notesGrid.map((row, r) => (
                <Row key={r}>
                    {row.map((isNote, c) => (
                        <Col key={c}>
                            <Text
                                style={{
                                    flex: 1,
                                    fontSize,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                {isNote
                                    ? settings.dotNotes
                                        ? "*"
                                        : "N"
                                    : null}
                            </Text>
                        </Col>
                    ))}
                </Row>
            ))}
        </Grid>
    );
}
