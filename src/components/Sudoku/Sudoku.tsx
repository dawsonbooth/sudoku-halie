import React, { useState } from "react";
import defaultColors, { ColorsContext } from "./colors";
import defaultSettings, { SettingsContext } from "./settings";
import Game from "./Game";
import { Col, Grid } from "native-base";
import Board from "./Board";
import Controls from "./Controls";
import _ from "lodash";
import colors from "./colors";
import settings from "./settings";

interface PropTypes {
    board?: Sudoku.Game["board"];
    settings?: Sudoku.Settings;
    colors?: Sudoku.Colors;
}

export default function _Sudoku({
    board = null,
    colors = defaultColors,
    settings = defaultSettings
}: PropTypes) {
    const [game, setGame] = useState(Game.load(board) || Game.new(9, 0.4));
    const [size, setSize] = useState(0);

    const updateSize = e => {
        const { height, width } = e.nativeEvent.layout;
        setSize(Math.min(height, width));
    };

    const handleCellPress = (location: Sudoku.Location) => {
        game.select(location);
        setGame(_.clone(game));
        // TODO: Find out why this is necessary
    };

    const handleEraserButtonPress = () => {
        game.erase();
        setGame(_.clone(game));
    };

    const handleRevealButtonPress = () => {
        game.reveal();
        setGame(_.clone(game));
    };

    const handleNumberButtonPress = (number: number) => {
        game.write(number);
        setGame(_.clone(game));
    };

    return (
        <ColorsContext.Provider value={colors}>
            <SettingsContext.Provider value={settings}>
                <Grid onLayout={updateSize}>
                    <Col style={{ alignItems: "center" }}>
                        <Board
                            grid={game.board}
                            handleCellPress={handleCellPress}
                            size={size}
                        />
                        <Controls
                            progress={game.progress}
                            size={size}
                            handleEraserButtonPress={handleEraserButtonPress}
                            handleRevealButtonPress={handleRevealButtonPress}
                            handleNumberButtonPress={handleNumberButtonPress}
                        />
                    </Col>
                </Grid>
            </SettingsContext.Provider>
        </ColorsContext.Provider>
    );
}

_Sudoku.Game = Game;
_Sudoku.colors = colors;
_Sudoku.settings = settings;
