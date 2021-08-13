import { useState, useEffect } from "react";
import { Alert } from "react-native";
import * as Sudoku from "./types";
import _ from "lodash";

export const useGame = (
  onChange: (board: Sudoku.Game["board"]) => void,
  initial: Sudoku.Game
): {
  game: Sudoku.Game;
  notesMode: boolean;
  handleCellPress: (location: Sudoku.Location) => void;
  handleNotesButtonPress: () => void;
  handleEraserButtonPress: () => void;
  handleRevealButtonPress: () => void;
  handleNumberButtonPress: (number: number) => void;
} => {
  const [game, setGame] = useState(() => initial);
  const [notesMode, setNotesMode] = useState(false);

  useEffect(() => {
    onChange(game.board);
  }, [game.board, onChange]);

  const updateGame = (game: Sudoku.Game) => {
    onChange(game.board);
    // setGame(Object.defineProperties(game, {}));
    setGame(_.clone(game)); // necessary because of Object.is comparison
  };

  const handleCellPress = (location: Sudoku.Location): void => {
    game.select(location);
    updateGame(game);
  };

  const handleNotesButtonPress = (): void => {
    setNotesMode(!notesMode);
  };

  const handleEraserButtonPress = (): void => {
    game.erase();
    updateGame(game);
  };

  const handleRevealButtonPress = (): void =>
    Alert.alert(
      "Reveal",
      "Are you sure you want to reveal this cell?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            game.reveal();
            updateGame(game);
          },
        },
      ],
      { cancelable: false }
    );

  const handleNumberButtonPress = (number: number): void => {
    if (notesMode) game.toggleNote(number);
    else game.write(number);
    updateGame(game);
  };

  return {
    game,
    notesMode,
    handleCellPress,
    handleNotesButtonPress,
    handleEraserButtonPress,
    handleRevealButtonPress,
    handleNumberButtonPress,
  };
};
