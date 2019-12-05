import React, { useState } from "react";
import defaultColors, { ColorsContext } from "./colors";
import defaultSettings, { SettingsContext } from "./settings";
import Game from "./Game";
import { Col, Grid } from "native-base";
import Board from "./Board";
import Controls from "./Controls";
import _ from "lodash";

interface PropTypes {
    prefilledRatio?: number;
    settings?: Sudoku.Settings;
    colors?: Sudoku.Colors;
}

export default function Sudoku({
    prefilledRatio = 0.4,
    colors = defaultColors,
    settings = defaultSettings
}: PropTypes) {
    const [game, setGame] = useState(new Game(settings.degree, prefilledRatio));
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
                            handleNumberButtonPress={handleNumberButtonPress}
                        />
                    </Col>
                </Grid>
            </SettingsContext.Provider>
        </ColorsContext.Provider>
    );
}
