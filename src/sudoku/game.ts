import _ from "lodash";
import { Game, Location } from "./types";
import { solvePuzzle, findPeers, findConflicts } from "./utils";

export const constructGame = (
  degree: Game["degree"],
  board: Game["board"],
  selected: Game["selected"],
  progress: Game["progress"]
): Game => {
  const game = {
    degree,
    board,
    selected,
    progress,
  };

  checkCompleted(game);
  checkConflicts(game);

  return game;
};

export const loadGame = (board: Game["board"]): Game => {
  const degree = board.length;

  let selected: Location | null = null;

  const progress = _.range(1, degree + 1).map(() => 0);

  const solution = _.range(0, degree).map((_value, row: Location["row"]) =>
    _.range(0, degree).map((_value, col: Location["col"]) => ({
      value: board[row][col].value,
      location: { row, col },
    }))
  );

  solvePuzzle(solution, degree);

  for (let row = 0; row < degree; row++) {
    for (let col = 0; col < degree; col++) {
      const cell = board[row][col];
      if (cell.isSelected) selected = { row, col };
      if (cell.value > 0) progress[cell.value] += 1 / degree;
      cell.solution = solution[row][col].value;
    }
  }

  return constructGame(degree, board, selected, progress);
};

export const newGame = ({
  degree,
  prefilledRatio,
}: {
  degree: number;
  prefilledRatio: number;
}): Game => {
  if (!(degree >= 0 && Math.sqrt(degree) % 1 === 0))
    throw TypeError("degree setting must be a perfect square");
  if (prefilledRatio > 1 || prefilledRatio < 0)
    throw TypeError("prefilledRatio prop must be between 0 and 1");

  const board = _.range(0, degree).map((_value, row: Location["row"]) =>
    _.range(0, degree).map((_value, col: Location["col"]) => ({
      value: 0,
      notes: _.range(0, degree + 1).map(() => false),
      isPrefilled: false,
      isCompleted: false,
      isSelected: false,
      isPeer: false,
      isEqual: false,
      isConflict: false,
      solution: 0,
      location: { row, col },
    }))
  );

  const solution = _.range(0, degree).map((_value, row: Location["row"]) =>
    _.range(0, degree).map((_value, col: Location["col"]) => ({
      value: board[row][col].value,
      location: { row, col },
    }))
  );

  solvePuzzle(solution, degree);

  for (let row = 0; row < degree; row++)
    for (let col = 0; col < degree; col++)
      board[row][col].solution = solution[row][col].value;

  prefill(board, prefilledRatio, degree);

  const progress = _.range(0, degree + 1).map(() => 0);

  for (const row of board)
    for (const cell of row)
      if (cell.value > 0) progress[cell.value] += 1 / degree;

  return constructGame(degree, board, null, progress);
};

export const prefill = (
  board: Game["board"],
  prefilledRatio: number,
  degree: number
): void => {
  const ratioIncrement = 1 / (degree * degree);
  let filledRatio = 0;
  for (let r = 0; r < degree; r++) {
    for (let c = 0; c < degree; c++) {
      board[r][c].value = 0;
      if (filledRatio < prefilledRatio && Math.random() < prefilledRatio) {
        board[r][c].value = board[r][c].solution;
        board[r][c].isPrefilled = true;
        filledRatio += ratioIncrement;
      }
    }
  }
};

export const checkCompleted = (game: Game): void => {
  game.board.forEach((row) =>
    row.forEach((cell) => {
      cell.isCompleted = game.progress[cell.value] >= 1;
    })
  );
};

export const flagPeers = (game: Game): void => {
  if (game.selected) {
    const peers = findPeers(game.board, game.selected, game.degree);
    for (const c of peers) {
      const { row, col } = c.location;
      game.board[row][col].isPeer = true;
    }
  }
};

export const flagEquals = (game: Game): void => {
  if (!game.selected) return;
  const { row, col } = game.selected;
  const value = game.board[row][col].value;
  for (const row of game.board)
    for (const cell of row) cell.isEqual = value !== 0 && value === cell.value;
};

export const checkConflicts = (game: Game): void => {
  for (const row of game.board)
    for (const cell of row) {
      cell.isConflict = false;
      const conflicts = findConflicts(
        game.board,
        cell.location,
        cell.value,
        game.degree
      );
      if (conflicts.length > 0) {
        cell.isConflict = true;
        for (const conflict of conflicts) {
          const { row, col } = conflict.location;
          game.board[row][col].isConflict = true;
        }
      }
    }
};

export const unflagEquals = (game: Game): void => {
  game.board.forEach((row) =>
    row.forEach((cell) => {
      cell.isEqual = false;
    })
  );
};

export const unflagPeers = (game: Game): void => {
  game.board.forEach((row) =>
    row.forEach((cell) => {
      cell.isPeer = false;
    })
  );
};

export const increaseProgress = (game: Game, number: number): void => {
  game.progress[number] += 1 / game.degree;
};

export const decreaseProgress = (game: Game, number: number): void => {
  game.progress[number] -= 1 / game.degree;
};

export const deselect = (game: Game): void => {
  if (game.selected) {
    const { row, col } = game.selected;
    const selected = game.board[row][col];
    unflagEquals(game);
    unflagPeers(game);
    selected.isSelected = false;
    game.selected = null;
  }
};

export const select = (game: Game, { row, col }: Location): void => {
  if (game.selected) {
    if (game.selected.row === row && game.selected.col === col) return;
    else deselect(game);
  }

  game.selected = { row, col };
  const selected = game.board[row][col];
  selected.isSelected = true;
  flagPeers(game);
  flagEquals(game);
};

export const erase = (game: Game): void => {
  if (!game.selected) return;

  const { row, col } = game.selected;
  const selected = game.board[row][col];
  if (selected.value && !selected.isPrefilled) {
    decreaseProgress(game, selected.value);
    selected.value = 0;
    checkCompleted(game);
    checkConflicts(game);
    flagEquals(game);
  }
};

export const write = (game: Game, value: number): void => {
  if (!game.selected) return;

  const { row, col } = game.selected;
  const selected = game.board[row][col];

  if (!selected.isPrefilled && selected.value !== value) {
    unflagEquals(game);
    decreaseProgress(game, selected.value);
    selected.value = value;
    increaseProgress(game, value);
    checkCompleted(game);
    checkConflicts(game);
    flagEquals(game);
  }
};

export const toggleNote = (game: Game, number: number): void => {
  if (!game.selected) return;
  const { row, col } = game.selected;
  const notes = game.board[row][col].notes;
  if (notes) {
    if (!notes[number]) {
      notes[number] = true;
      notes[0] = true;
    } else {
      notes[number] = false;
      notes[0] = notes.slice(1).reduce((agg, v) => agg || v);
    }
  }
};

export const reveal = (game: Game): void => {
  if (!game.selected) return;

  const { row, col } = game.selected;
  const selected = game.board[row][col];

  if (selected && !selected.isPrefilled) {
    write(game, selected.solution);
    selected.isPrefilled = true;
  }
};
