import React, { useState } from "react";
import defaultColors, { ColorsContext } from "./colors";
import defaultSettings, { SettingsContext } from "./settings";
import { Col, Grid } from "native-base";
import Board from "./Board";
import Controls from "./Controls";

interface PropTypes {
    settings?: Sudoku.Settings;
    colors?: Sudoku.Colors;
}

export default function Game({
    colors = defaultColors,
    settings = defaultSettings
}: PropTypes) {
    if (!(settings.degree >= 0 && Math.sqrt(settings.degree) % 1 === 0))
        throw TypeError("degree setting must be a perfect square");

    // TODO: Maybe update game state in redux, option to start new game with different screen
    const [game, setGame] = useState({
        board: [...Array(settings.degree)].map(() =>
            [...Array(settings.degree)].map(() => ({
                value: null,
                notes: Array<boolean>(settings.degree + 1).fill(false),
                isPrefilled: false,
                isSelected: false,
                isPeer: false,
                isEqual: false,
                hasConflict: false
            }))
        ),
        selected: null,
        progress: [...Array(settings.degree + 1)].map(() => 0)
    });

    const [size, setSize] = useState(0);

    const updateSize = e => {
        const { height, width } = e.nativeEvent.layout;
        setSize(Math.min(height, width));
    };

    const select = (i: number, j: number) => { // TODO: Consider adding 'handle' functions (handleCellPress)
        if (game.selected) {
            game.selected.isSelected = false;
        }
        game.board[i][j].isSelected = true;
        game.selected = game.board[i][j];
        setGame({ ...game });
    };

    const erase = () => {
        if (game.selected && game.selected.value !== null) {
            game.progress[game.selected.value] -= 1 / settings.degree;
            game.selected.value = null;
            setGame({ ...game });
        }
    };

    const write = (number: number) => {
        if (game.selected && game.selected.value !== number) {
            erase();
            game.selected.value = number;
            game.progress[number] += 1 / settings.degree;
            setGame({ ...game });
        }
    };

    return (
        <ColorsContext.Provider value={colors}>
            <SettingsContext.Provider value={settings}>
                <Grid onLayout={updateSize}>
                    <Col style={{ alignItems: "center" }}>
                        <Board
                            grid={game.board}
                            handleCellPress={select}
                            size={size}
                        />
                        <Controls
                            progress={game.progress}
                            size={size}
                            handleEraserButtonPress={erase}
                            handleNumberButtonPress={write}
                        />
                    </Col>
                </Grid>
            </SettingsContext.Provider>
        </ColorsContext.Provider>
    );
}
