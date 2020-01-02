import { useState } from "react";
import { Alert } from "react-native";
import Game from "./Game";
import _ from "lodash";

export const useGame = (board: Sudoku.Game["board"]) => {
    const [game, setGame] = useState(Game.load(board) || Game.new(9, 0.4));
    const [notesMode, setNotesMode] = useState(false);

    const handleCellPress = (location: Sudoku.Location): void => {
        game.select(location);
        setGame(_.clone(game)); // necessary because of Object.is comparison
    };

    const handleNotesButtonPress = (): void => {
        setNotesMode(!notesMode);
    };

    const handleEraserButtonPress = (): void => {
        game.erase();
        setGame(_.clone(game));
    };

    const handleRevealButtonPress = (): void =>
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

    const handleNumberButtonPress = (number: number): void => {
        if (notesMode) game.toggleNote(number);
        else game.write(number);
        setGame(_.clone(game));
    };

    return {
        game,
        notesMode,
        handleCellPress,
        handleNotesButtonPress,
        handleEraserButtonPress,
        handleRevealButtonPress,
        handleNumberButtonPress
    };
};
