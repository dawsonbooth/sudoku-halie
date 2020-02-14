import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { game as actions } from "../actions";
import { State } from "../types";

export const useGame = () => {
  const game = useSelector((state: State) => state.game);

  const dispatch = useDispatch();

  const startGame = useCallback(() => dispatch({ type: actions.START }), [
    dispatch
  ]);

  const endGame = useCallback(() => dispatch({ type: actions.END }), [
    dispatch
  ]);

  const saveGame = useCallback(
    (board: Sudoku.Game["board"]) => dispatch({ type: actions.SAVE, board }),
    [dispatch]
  );

  return { game, startGame, endGame, saveGame };
};
