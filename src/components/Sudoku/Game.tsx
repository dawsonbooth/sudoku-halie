import React, { useState } from "react";
import { View, Col } from "native-base";
import Board from "./Board";
import Controls from "./Controls";

interface PropTypes {
    dimension?: number;
    settings: Sudoku.Settings; // TODO: Consider unpacking settings, separate prop for each
}

export default function Game({ dimension = 9, settings }: PropTypes) {
    // TODO: Maybe update game state in redux, option to start new game with different screen
    const [game, setGame] = useState({
        board: [...Array(dimension)].map(() =>
            [...Array(dimension)].map(() => ({
                value: null,
                notes: Array<boolean>(dimension + 1).fill(false),
                isPrefilled: false,
                isSelected: false,
                isPeer: false,
                isEqual: false,
                hasConflict: false
            }))
        ),
        selected: null,
        progress: [...Array(dimension + 1)].map(() => 0)
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

    const write = (number: number) => {
        if (game.selected && game.selected.value !== number) {
            game.selected.value = number;
            game.progress[number] += 1 / dimension;
            setGame({ ...game });
        }
    };

    return (
        <View
            padder
            onLayout={updateSize}
            style={{
                flex: 1
            }}
        >
            <Col style={{ alignItems: "center" }}>
                <Board grid={game.board} onSelectCell={select} size={size} />
                <Controls
                    dimension={dimension}
                    progress={game.progress}
                    size={size}
                    handleNumberButtonPress={write}
                />
            </Col>
        </View>
    );
}
