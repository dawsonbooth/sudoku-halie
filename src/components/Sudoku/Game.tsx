import React, { useState } from "react";
import { View } from "native-base";
import Board from "./Board";
import Controls from "./Controls";

interface PropTypes {
    settings: Sudoku.Settings;
}

export default function Game({ settings }: PropTypes) {
    const [game, setGame] = useState({
        board: Array(9)
            .fill(0)
            .map(() =>
                Array(9)
                    .fill(0)
                    .map(() => ({
                        value: null,
                        notes: Array<boolean>(10).fill(false),
                        isSelected: false
                    }))
            ),
        selected: null
    });

    const select = (i: number, j: number) => {
        if (game.selected) {
            game.selected.isSelected = false;
        }
        game.board[i][j].isSelected = true;
        game.selected = game.board[i][j];
        setGame({ ...game });
    };

    const write = (number: number) => {
        if (game.selected) {
            game.selected.value = number;
            setGame({ ...game });
        }
    };

    return (
        <View style={{ alignItems: "center" }}>
            <Board grid={game.board} size={300} select={select} />
            <Controls write={write} />
        </View>
    );
}
