import _ from "lodash";

function findPeers(
  board: Game["board"],
  { row, col }: Location,
  degree: Settings["degree"]
): Array<Cell> {
  const peers = new Array<Cell>();
  const unit = Math.sqrt(degree);
  const m_edge = unit * Math.floor(row / unit);
  const n_edge = unit * Math.floor(col / unit);
  for (let i = 0; i < degree; i++) {
    const m = m_edge + Math.floor(i / unit);
    const n = n_edge + (i % unit);
    if (i !== col) peers.push(board[row][i]);
    if (i !== row) peers.push(board[i][col]);
    if (m !== row && n !== col) peers.push(board[m][n]);
  }
  return peers;
}

function findConflicts(
  board: Game["board"],
  { row, col }: Location,
  value: Cell["value"],
  degree: Settings["degree"]
): Array<Cell> {
  const conflicts = findPeers(board, { row, col }, degree).filter(
    (cell) => cell.value == value
  );
  return conflicts;
}

function solvePuzzle(
  board: Game["board"],
  degree: Settings["degree"]
): boolean {
  const values = _.shuffle(_.range(1, degree + 1));
  for (let r = 0; r < degree; r++) {
    for (let c = 0; c < degree; c++) {
      if (board[r][c].value == null) {
        for (const value of values) {
          if (
            findConflicts(board, { row: r, col: c }, value, degree).length == 0
          ) {
            board[r][c].value = value;
            board[r][c].solution = value;
            if (solvePuzzle(board, degree)) {
              return true;
            } else {
              board[r][c].value = null;
            }
          }
        }
        return false;
      }
    }
  }
  return true;
}

function prefill(
  board: Game["board"],
  prefilledRatio: number,
  degree: Settings["degree"]
): void {
  const ratioIncrement = 1 / (degree * degree);
  let filledRatio = 0;
  for (let r = 0; r < degree; r++) {
    for (let c = 0; c < degree; c++) {
      board[r][c].value = null;
      if (filledRatio < prefilledRatio && Math.random() < prefilledRatio) {
        board[r][c].value = board[r][c].solution;
        board[r][c].isPrefilled = true;
        filledRatio += ratioIncrement;
      }
    }
  }
}
export class Conflicts {
  sources: Cell[] = new Array<Cell>();
  outer: Cell[][] = new Array<Cell[]>();

  static find(
    board: Game["board"],
    { row, col }: Location,
    value: Cell["value"],
    degree: Settings["degree"],
    callback?: (cell: Cell) => void
  ): Array<Cell> {
    const conflicts = this.potential(board, { row, col }, degree).filter(
      (cell) => cell.value == value
    );
    if (callback) conflicts.forEach(callback);
    return conflicts;
  }

  static potential(
    board: Game["board"],
    { row, col }: Location,
    degree: Settings["degree"]
  ): Array<Cell> {
    const peers = new Array<Cell>();
    const unit = Math.sqrt(degree);
    const m_edge = unit * Math.floor(row / unit);
    const n_edge = unit * Math.floor(col / unit);
    for (let i = 0; i < degree; i++) {
      const m = m_edge + Math.floor(i / unit);
      const n = n_edge + (i % unit);
      if (i !== col) peers.push(board[row][i]);
      if (i !== row) peers.push(board[i][col]);
      if (m !== row && n !== col) peers.push(board[m][n]);
    }
    return peers;
  }

  add(source: Cell, leaves: Cell[]): void {
    const si = this.sources.indexOf(source);
    if (si >= 0) {
      this.outer[si] = leaves;
      if (source.value !== this.sources[si].value)
        this.sources[si].value = source.value;
      return;
    }

    this.sources.push(source);
    this.outer.push(leaves);
  }

  update(board: Game["board"], degree: Settings["degree"]): void {
    const newConflicts = new Conflicts();

    this.sources.forEach((source) => {
      if (source.value === null) return;

      const leaves = Conflicts.find(
        board,
        source.location,
        source.value,
        degree
      );

      if (leaves.length > 0) {
        newConflicts.add(source, leaves);
      }
    });

    this.sources = newConflicts.sources;
    this.outer = newConflicts.outer;
  }

  toSet(): Set<Cell> {
    return new Set<Cell>([].concat(this.sources, ...this.outer));
  }
}

export class Game {
  degree: Settings["degree"];
  board: Cell[][];
  selected: Cell;
  conflicts: Conflicts;
  progress: number[];

  constructor(
    degree: Game["degree"],
    board: Game["board"],
    selected: Game["selected"],
    conflicts: Game["conflicts"],
    progress: Game["progress"]
  ) {
    this.degree = degree;
    this.board = board;
    this.selected = selected;
    this.conflicts = conflicts;
    this.progress = progress;

    this.checkCompleted();
    this.checkConflicts();
  }

  static load(board: Game["board"]): Game {
    const degree = board.length;

    let selected = null;

    const conflicts = new Conflicts();

    const progress = _.range(1, degree + 1).map(() => 0);

    const solution = _.range(0, degree).map((_value, row: Location["row"]) =>
      _.range(0, degree).map((_value, col: Location["col"]) => {
        const cell = board[row][col];
        if (cell.isSelected) selected = cell;
        if (cell.isConflict) {
          const cellConflicts = Conflicts.find(
            board,
            cell.location,
            cell.value,
            degree
          );
          if (cellConflicts.length > 0) conflicts.add(cell, cellConflicts);
        }
        progress[board[row][col].value] += 1 / degree;
        return {
          value: null,
          location: { row, col },
        };
      })
    );

    solvePuzzle(solution, degree);

    return new this(degree, board, selected, conflicts, progress);
  }

  static new(
    degree: Settings["degree"],
    prefilledRatio: Settings["prefilledRatio"]
  ): Game {
    if (!(degree >= 0 && Math.sqrt(degree) % 1 === 0))
      throw TypeError("degree setting must be a perfect square");
    if (prefilledRatio > 1 || prefilledRatio < 0)
      throw TypeError("prefilledRatio prop must be between 0 and 1");

    const board = _.range(0, degree).map((_value, row: Location["row"]) =>
      _.range(0, degree).map((_value, col: Location["col"]) => ({
        value: null,
        notes: _.range(0, degree + 1).map(() => false),
        isPrefilled: false,
        isCompleted: false,
        isSelected: false,
        isPeer: false,
        isEqual: false,
        isConflict: false,
        solution: null,
        location: { row, col },
      }))
    );

    const conflicts = new Conflicts();

    const progress = _.range(0, degree + 1).map(() => 0);

    solvePuzzle(board, degree);

    prefill(board, prefilledRatio, degree);
    for (const r of board)
      for (const cell of r) if (cell.value) progress[cell.value] += 1 / degree;

    return new this(degree, board, null, conflicts, progress);
  }

  checkCompleted = (): void => {
    this.board.forEach((row) =>
      row.forEach((cell) => {
        cell.isCompleted = this.progress[cell.value] >= 1;
      })
    );
  };

  checkConflicts = (): void => {
    this.conflicts.update(this.board, this.degree);

    const conflictsSet = this.conflicts.toSet();
    this.board.forEach((row) =>
      row.forEach((cell) => {
        cell.isConflict = cell.value !== null && conflictsSet.has(cell);
      })
    );
  };

  flagPeers = (): void => {
    if (this.selected) {
      const peers = Conflicts.potential(
        this.board,
        this.selected.location,
        this.degree
      );
      for (const c of peers) {
        c.isPeer = true;
      }
    }
  };

  flagEquals = (): void => {
    if (this.selected) {
      this.board.forEach((row) =>
        row.forEach((cell) => {
          cell.isEqual =
            this.selected.value !== null && this.selected.value === cell.value;
        })
      );
    }
  };

  flagConflicts = (): void => {
    if (this.selected && this.selected.value) {
      const cellConflicts = Conflicts.find(
        this.board,
        this.selected.location,
        this.selected.value,
        this.degree
      );
      if (cellConflicts.length > 0) {
        this.selected.isConflict = true;
        cellConflicts.forEach((cell) => {
          cell.isConflict = true;
        });
        this.conflicts.add(this.selected, cellConflicts);
      }
    }
  };

  unflagEquals = (): void => {
    this.board.forEach((row) =>
      row.forEach((cell) => {
        cell.isEqual = false;
      })
    );
  };

  unflagPeers = (): void => {
    this.board.forEach((row) =>
      row.forEach((cell) => {
        cell.isPeer = false;
      })
    );
  };

  increaseProgress = (number: number): void => {
    this.progress[number] += 1 / this.degree;
  };

  decreaseProgress = (number: number): void => {
    this.progress[number] -= 1 / this.degree;
  };

  deselect = (): void => {
    if (this.selected) {
      this.unflagEquals();
      this.unflagPeers();
      this.selected.isSelected = false;
      this.selected = null;
    }
  };

  select = ({ row, col }: Location): void => {
    if (this.selected) {
      if (
        this.selected.location.row === row &&
        this.selected.location.col === col
      ) {
        return;
      } else {
        this.deselect();
      }
    }

    this.selected = this.board[row][col];
    this.selected.isSelected = true;
    this.flagPeers();
    this.flagEquals();
  };

  erase = (): void => {
    if (this.selected && this.selected.value && !this.selected.isPrefilled) {
      this.decreaseProgress(this.selected.value);
      this.selected.value = null;
      this.checkCompleted();
      this.checkConflicts();
      this.flagEquals();
    }
  };

  write = (number: number): void => {
    if (
      this.selected &&
      !this.selected.isPrefilled &&
      this.selected.value !== number
    ) {
      this.unflagEquals();
      this.decreaseProgress(this.selected.value);
      this.selected.value = number;
      this.increaseProgress(number);
      this.checkCompleted();
      this.flagConflicts();
      this.checkConflicts();
      this.flagEquals();
    }
  };

  toggleNote = (number: number): void => {
    if (this.selected) {
      if (!this.selected.notes[number]) {
        this.selected.notes[number] = true;
        this.selected.notes[0] = true;
      } else {
        this.selected.notes[number] = false;
        this.selected.notes[0] = this.selected.notes
          .slice(1)
          .reduce((agg, v) => agg || v);
      }
    }
  };

  reveal = (): void => {
    if (this.selected && !this.selected.isPrefilled) {
      this.write(this.selected.solution);
      this.selected.isPrefilled = true;
    }
  };
}

export interface Cell {
  value: number;
  notes?: boolean[];
  isPrefilled?: boolean;
  isSelected?: boolean;
  isCompleted?: boolean;
  isPeer?: boolean;
  isEqual?: boolean;
  isConflict?: boolean;
  solution?: number;
  location: Location;
}

export interface Location {
  row: number;
  col: number;
}

export interface Colors {
  text: string;
  board: {
    border: string;
    cell: {
      normal: string;
      peer: string;
      equal: string;
      conflict: string;
      selected: string;
      completed: string;
    };
  };
  controls: {
    numberButton: {
      background: string;
      border: string;
      progress: string;
      completed: string;
    };
  };
}

export interface Settings {
  degree: number;
  prefilledRatio: number;
  dotNotes: boolean;
  showCompleted: boolean;
  showPeers: boolean;
  showEqual: boolean;
  showConflicts: boolean;
}
