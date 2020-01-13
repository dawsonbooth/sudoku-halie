import React from "react";
import { useScreenDimensions } from "react-native-use-dimensions";
import { useGame } from "./hooks";
import defaultColors, { ColorsContext } from "./colors";
import defaultSettings, { SettingsContext } from "./settings";
import { Col, Grid } from "react-native-easy-grid";
import Game from "./Game";
import Board from "./Board";
import Controls from "./Controls";

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
    const {
        game,
        notesMode,
        handleCellPress,
        handleNotesButtonPress,
        handleEraserButtonPress,
        handleRevealButtonPress,
        handleNumberButtonPress
    } = useGame(() =>
        board === null
            ? Game.new(settings.degree, settings.prefilledRatio)
            : Game.load(board)
    );

    const { height, width } = useScreenDimensions();
    const boardSize = Math.min(height * 0.5, width);

    const controlsSize = width;

    return (
        <ColorsContext.Provider value={colors}>
            <SettingsContext.Provider value={settings}>
                <Grid>
                    <Col style={{ alignItems: "center" }}>
                        <Board
                            grid={game.board}
                            handleCellPress={handleCellPress}
                            size={boardSize}
                        />
                        <Controls
                            progress={game.progress}
                            size={controlsSize}
                            notesMode={notesMode}
                            handleNotesButtonPress={handleNotesButtonPress}
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
_Sudoku.colors = defaultColors;
_Sudoku.settings = defaultSettings;
