import { prefill, solvePuzzle, findConflicts, findPeers } from "./utils";

class Conflicts {
    sources: Sudoku.Cell[] = new Array<Sudoku.Cell>();
    outer: Sudoku.Cell[][] = new Array<Sudoku.Cell[]>();

    static find(
        board: Sudoku.Game["board"],
        { row, col }: Sudoku.Location,
        value: Sudoku.Cell["value"],
        degree: Sudoku.Settings["degree"],
        callback?: (cell) => {}
    ): Array<Sudoku.Cell> {
        const conflicts = findPeers(board, { row, col }, degree).filter(
            cell => cell.value == value
        );
        if (callback) conflicts.forEach(callback);
        return conflicts;
    }

    add(source, leaves) {
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

    update(board: Sudoku.Game["board"], degree: Sudoku.Settings["degree"]) {
        const newConflicts = new Conflicts();

        this.sources.forEach((source, i) => {
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

    toSet() {
        return new Set<Sudoku.Cell>([].concat(this.sources, ...this.outer));
    }
}

export default class Game {
    degree: Sudoku.Settings["degree"];
    board: Sudoku.Cell[][];
    selected: Sudoku.Cell;
    conflicts: Conflicts;
    progress: number[];

    constructor(
        degree: Sudoku.Settings["degree"],
        board: Sudoku.Cell[][],
        conflicts: Conflicts,
        progress: number[]
    ) {
        this.degree = degree;
        this.board = board;
        this.selected = null;
        this.conflicts = conflicts;
        this.progress = progress;

        this.checkCompleted();
        this.checkConflicts();
    }

    static load(board: Sudoku.Game["board"]) {
        const degree = board.length;

        const conflicts = new Conflicts();

        const progress = [...Array(degree + 1)].map(() => 0);

        const solution = [...Array(degree)].map(
            (_, row: Sudoku.Location["row"]) =>
                [...Array(degree)].map((_, col: Sudoku.Location["col"]) => {
                    const cell = board[row][col];
                    if (cell.isSelected) cell.isSelected = false;
                    if (cell.isConflict) {
                        const cellConflicts = Conflicts.find(
                            board,
                            cell.location,
                            cell.value,
                            degree
                        );
                        if (cellConflicts.length > 0)
                            conflicts.add(cell, cellConflicts);
                    }
                    progress[board[row][col].value] += 1 / degree;
                    return {
                        value: null,
                        location: { row, col }
                    };
                })
        );

        solvePuzzle(solution, degree);

        return new this(degree, board, conflicts, progress);
    }

    static new(degree: number, prefilledRatio: number) {
        if (!(degree >= 0 && Math.sqrt(degree) % 1 === 0))
            throw TypeError("degree setting must be a perfect square");
        if (prefilledRatio > 1 || prefilledRatio < 0)
            throw TypeError("prefilledRatio prop must be between 0 and 1");

        const board = [...Array(degree)].map((_, row: Sudoku.Location["row"]) =>
            [...Array(degree)].map((_, col: Sudoku.Location["col"]) => ({
                value: null,
                notes: Array<boolean>(degree + 1).map(() => false),
                isPrefilled: false,
                isCompleted: false,
                isSelected: false,
                isPeer: false,
                isEqual: false,
                isConflict: false,
                solution: null,
                location: { row, col }
            }))
        );

        const conflicts = new Conflicts();

        const progress = [...Array(degree + 1)].map(() => 0);

        solvePuzzle(board, degree);

        prefill(board, prefilledRatio, degree);
        for (let r of board)
            for (let cell of r)
                if (cell.value) progress[cell.value] += 1 / degree;

        return new this(degree, board, conflicts, progress);
    }

    checkCompleted = (): void => {
        this.board.forEach(row =>
            row.forEach(cell => {
                cell.isCompleted = this.progress[cell.value] >= 1;
            })
        );
    };

    checkConflicts = (): void => {
        this.conflicts.update(this.board, this.degree);

        const conflictsSet = this.conflicts.toSet();
        this.board.forEach(row =>
            row.forEach(cell => {
                cell.isConflict = cell.value !== null && conflictsSet.has(cell);
            })
        );
    };

    flagPeers = (): void => {
        if (this.selected) {
            const peers = findPeers(
                this.board,
                this.selected.location,
                this.degree
            );
            for (let c of peers) {
                c.isPeer = true;
            }
        }
    };

    flagEquals = (): void => {
        if (this.selected) {
            this.board.forEach(row =>
                row.forEach(cell => {
                    cell.isEqual =
                        this.selected.value !== null &&
                        this.selected.value === cell.value;
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
                cellConflicts.forEach(cell => {
                    cell.isConflict = true;
                });
                this.conflicts.add(this.selected, cellConflicts);
            }
        }
    };

    unflagEquals = (): void => {
        this.board.forEach(row =>
            row.forEach(cell => {
                cell.isEqual = false;
            })
        );
    };

    unflagPeers = (): void => {
        this.board.forEach(row =>
            row.forEach(cell => {
                cell.isPeer = false;
            })
        );
    };

    increaseProgress = (number: number) => {
        this.progress[number] += 1 / this.degree;
    };

    decreaseProgress = (number: number) => {
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

    select = ({ row, col }: Sudoku.Location): void => {
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
        if (
            this.selected &&
            this.selected.value &&
            !this.selected.isPrefilled
        ) {
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
