import { useState, useEffect } from "react";
import { Alert } from "react-native";
import * as Sudoku from "./types";
import * as Game from "./game";
import produce from "immer";

export const useSudoku = (
  initial: Sudoku.Game,
  onChange?: (board: Sudoku.Game["board"]) => void
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
    if (onChange) onChange(game.board);
  }, [game.board, onChange]);

  const handleCellPress = (location: Sudoku.Location): void =>
    setGame(produce(game, (draft) => Game.select(draft, location)));

  const handleNotesButtonPress = (): void => setNotesMode(!notesMode);

  const handleEraserButtonPress = (): void =>
    setGame(produce(game, (draft) => Game.erase(draft)));

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
          onPress: () => setGame(produce(game, (draft) => Game.reveal(draft))),
        },
      ],
      { cancelable: false }
    );

  const handleNumberButtonPress = (number: number): void => {
    if (notesMode)
      setGame(produce(game, (draft) => Game.toggleNote(draft, number)));
    else setGame(produce(game, (draft) => Game.write(draft, number)));
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
