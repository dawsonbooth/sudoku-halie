import React, { useState } from "react";
import { Alert } from "react-native";
import _ from "lodash";
import { useScreenDimensions } from "./hooks";
import defaultColors, { ColorsContext } from "./colors";
import defaultSettings, { SettingsContext } from "./settings";
import { Col, Grid } from "native-base";
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
    const [game, setGame] = useState(Game.load(board) || Game.new(9, 0.4));
    const [notesMode, setNotesMode] = useState(false);
    const { height, width } = useScreenDimensions();
    const boardSize = Math.min(height * 0.5, width);

    const controlsSize = width;

    const handleCellPress = (location: Sudoku.Location) => {
        game.select(location);
        setGame(_.clone(game));
        // TODO: Find out why this is necessary
    };

    const handleNotesButtonPress = () => {
        setNotesMode(!notesMode);
    };

    const handleEraserButtonPress = () => {
        game.erase();
        setGame(_.clone(game));
    };

    const handleRevealButtonPress = () =>
        Alert.alert(
            "Reveal",
            "Are you sure you want to reveal this cell?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => {
                        game.reveal();
                        setGame(_.clone(game));
                    }
                }
            ],
            { cancelable: false }
        );

    const handleNumberButtonPress = (number: number) => {
        if (notesMode) game.toggleNote(number);
        else game.write(number);
        setGame(_.clone(game));
    };

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
