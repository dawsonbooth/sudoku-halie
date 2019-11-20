import React, { useState } from 'react';
import Board from './Board';
import { View } from 'native-base';
import Controls from './Controls';

interface PropTypes {
    settings: Sudoku.Settings;
}

export default function Game({ settings }: PropTypes) {
    const game: Sudoku.Game = {
        board: Array(9).fill(0).map(() => (
            Array(9).fill(0).map(() => ({
                value: null,
                notes: Array<boolean>(10).fill(false),
                isSelected: false,
            }))
        )),
        selected: null
    }
    const [gameState, setGameState] = useState(game)


    const select = (i: number, j: number) => {
        if (gameState.selected) {
            gameState.selected.isSelected = false;
        }
        gameState.board[i][j].isSelected = true;
        gameState.selected = gameState.board[i][j];
        setGameState({...gameState});
    }

    const write = (number: number) => {
        if (gameState.selected) {
            gameState.selected.value = number;
            setGameState({...gameState})
        }
    }

    return (
        <View style={{ alignItems: "center" }}>
            <Board grid={gameState.board} size={300} select={select} />
            <Controls write={write} />
        </View>
    );


}