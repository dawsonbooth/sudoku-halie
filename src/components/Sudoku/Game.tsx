import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Board from './Board';
import { View } from 'native-base';
import Controls from './Controls';

// TODO: Clean up code

export default function Game() {
    const game = useSelector((reduxState: State) => reduxState.game)
    const [gameState, setGameState] = useState(game)
    const dispatch = useDispatch()

    const updateGame = useCallback( // TODO: Consider removing redux
        () => dispatch({ type: 'UPDATE_GAME', game: gameState }),
        [dispatch]
    )

    const select = (i: number, j: number) => {
        console.log(i, j)
        let board = gameState.board;
        if (gameState.selected) {
            const { i: iOld, j: jOld } = gameState.selected;
            board[iOld][jOld].selected = false;
        }
        board[i][j].selected = true;
        console.log(board)
        setGameState({
            board,
            selected: { i, j }
        })
    }

    const write = (number: number) => {
        if (gameState.selected) {
            const { i, j } = gameState.selected;
            let board = gameState.board;
            board[i][j].value = number;
            setGameState({
                board,
                selected: { i, j } // TODO: Maybe remove somehow without messing up types
            })
        }
    }



    return (
        <View style={{ alignItems: "center" }}>
            <Board grid={gameState.board} size={300} select={select} />
            <Controls write={write} />
        </View>
    );


}