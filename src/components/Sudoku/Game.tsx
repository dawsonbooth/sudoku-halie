import React, { useState } from "react";
import { Col, Grid } from "native-base";
import Board from "./Board";
import Controls from "./Controls";

interface PropTypes {
    degree?: number;
    settings: Sudoku.Settings; // TODO: Consider unpacking settings, separate prop for each
}

export default function Game({ degree = 9, settings }: PropTypes) {
    if (!(degree >= 0 && Math.sqrt(degree) % 1 === 0))
        throw TypeError("degree prop must be a perfect square");
    // TODO: Maybe update game state in redux, option to start new game with different screen
    const [game, setGame] = useState({
        board: [...Array(degree)].map(() =>
            [...Array(degree)].map(() => ({
                value: null,
                notes: Array<boolean>(degree + 1).fill(false),
                isPrefilled: false,
                isSelected: false,
                isPeer: false,
                isEqual: false,
                hasConflict: false
            }))
        ),
        selected: null,
        progress: [...Array(degree + 1)].map(() => 0)
    });

    const [size, setSize] = useState(0);

    const updateSize = e => {
        const { height, width } = e.nativeEvent.layout;
        setSize(Math.min(height, width));
    };

    const select = (i: number, j: number) => {
        if (game.selected) {
            game.selected.isSelected = false;
        }
        game.board[i][j].isSelected = true;
        game.selected = game.board[i][j];
        setGame({ ...game });
    };

    const erase = () => {
        if (game.selected && game.selected.value !== null) {
            game.progress[game.selected.value] -= 1 / degree;
            game.selected.value = null;
            setGame({ ...game });
        }
    };

    const write = (number: number) => {
        if (game.selected && game.selected.value !== number) {
            erase();
            game.selected.value = number;
            game.progress[number] += 1 / degree;
            setGame({ ...game });
        }
    };

    return (
        <Grid onLayout={updateSize}>
            <Col style={{ alignItems: "center" }}>
                <Board grid={game.board} onSelectCell={select} size={size} />
                <Controls
                    degree={degree}
                    progress={game.progress}
                    size={size}
                    handleEraserButtonPress={erase}
                    handleNumberButtonPress={write}
                />
            </Col>
        </Grid>
    );
}
