import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Cell } from "../../sudoku";
import { game as actions } from "../actions";
import { State, Game } from "../types";

export const useGame = (): {
  game: Game;
  startGame: () => {
    type: string;
  };
  endGame: () => {
    type: string;
  };
  saveGame: (board: Game["board"]) => {
    type: string;
    board: Cell[][];
  };
} => {
  const game = useSelector((state: State) => state.game);

  const dispatch = useDispatch();

  const startGame = useCallback(
    () => dispatch({ type: actions.START }),
    [dispatch]
  );

  const endGame = useCallback(
    () => dispatch({ type: actions.END }),
    [dispatch]
  );

  const saveGame = useCallback(
    (board: Game["board"]) => dispatch({ type: actions.SAVE, board }),
    [dispatch]
  );

  return { game, startGame, endGame, saveGame };
};
