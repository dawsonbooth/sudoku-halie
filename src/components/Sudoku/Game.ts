import { prefill, solvePuzzle, findConflicts, findPeers } from "./utils";

export default class Game implements Sudoku.Game {
    degree: Sudoku.Game["degree"];
    board: Sudoku.Game["board"];
    selected: Sudoku.Game["selected"];
    conflicts: Sudoku.Game["conflicts"];
    progress: Sudoku.Game["progress"];
    solution: Sudoku.Game["solution"];

    constructor(
        degree: Sudoku.Game["degree"],
        board: Sudoku.Game["board"],
        selected: Sudoku.Game["selected"],
        conflicts: Sudoku.Game["conflicts"],
        progress: Sudoku.Game["progress"],
        solution: Sudoku.Game["solution"]
    ) {
        this.degree = degree;
        this.board = board;
        this.selected = selected;
        this.conflicts = conflicts;
        this.progress = progress;
        this.solution = solution;

        this.addSelectionFlags();
        this.checkCompleted();
        this.checkConflicts();
    }

    static load(board: Sudoku.Game["board"] | null) {
        if (board === null) return null;

        const degree = board.length;

        let selected: Sudoku.Cell;

        const conflicts = [];

        const progress = [...Array(degree + 1)].map(() => 0);

        const solution = [...Array(degree)].map(
            (_, row: Sudoku.Location["row"]) =>
                [...Array(degree)].map((_, col: Sudoku.Location["col"]) => {
                    const cell = board[row][col];
                    if (cell.isSelected) selected = cell;
                    if (cell.isConflict) {
                        const cellConflicts = findConflicts(
                            board,
                            cell.location,
                            cell.value,
                            degree
                        );
                        if (cellConflicts.length > 0)
                            conflicts.push([
                                cell.location,
                                ...cellConflicts.map(c => c.location)
                            ]);
                    }
                    progress[board[row][col].value] += 1 / degree;
                    return {
                        value: null,
                        location: { row, col }
                    };
                })
        );

        solvePuzzle(solution, degree);

        return new this(degree, board, selected, conflicts, progress, solution);
    }

    static new(degree: number, prefilledRatio: number) {
        if (!(degree >= 0 && Math.sqrt(degree) % 1 === 0))
            throw TypeError("degree setting must be a perfect square");
        if (prefilledRatio > 1 || prefilledRatio < 0)
            throw TypeError("prefilledRatio prop must be between 0 and 1");

        const board = [...Array(degree)].map((_, row: Sudoku.Location["row"]) =>
            [...Array(degree)].map((_, col: Sudoku.Location["col"]) => ({
                value: null,
                notes: Array<boolean>(degree + 1).fill(false),
                isPrefilled: false,
                isCompleted: false,
                isSelected: false,
                isPeer: false,
                isEqual: false,
                isConflict: false,
                location: { row, col }
            }))
        );

        const selected = null;

        const conflicts = [];

        const progress = [...Array(degree + 1)].map(() => 0);

        const solution = [...Array(degree)].map(
            (_, row: Sudoku.Location["row"]) =>
                [...Array(degree)].map((_, col: Sudoku.Location["col"]) => ({
                    value: null,
                    location: { row, col }
                }))
        );

        solvePuzzle(solution, degree);

        prefill(board, solution, prefilledRatio, degree);
        for (let r of board)
            for (let cell of r)
                if (cell.value) progress[cell.value] += 1 / degree;

        return new this(degree, board, selected, conflicts, progress, solution);
    }

    checkCompleted = (): void => {
        this.board.forEach(row =>
            row.forEach(cell => {
                cell.isCompleted = this.progress[cell.value] >= 1;
            })
        );
    };

    checkConflicts = (): void => {
        const newConflicts = [];

        this.conflicts.forEach((locations, i) => {
            const source = this.board[locations[0].row][locations[0].col];

            const sourceConflicts = findConflicts(
                this.board,
                source.location,
                source.value,
                this.degree
            );

            const newLocations = [source.location];

            for (let j = 1; j < locations.length; j++) {
                if (
                    sourceConflicts
                        .map(cell => cell.location)
                        .includes(locations[j])
                )
                    newLocations.push(locations[j]);
            }

            newConflicts.push(newLocations);
        });
        const conflictsSet = new Set([].concat(...this.conflicts));
        this.board.forEach(row =>
            row.forEach(cell => {
                cell.isConflict =
                    cell.value !== null && conflictsSet.has(cell.location);
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
        if (this.selected && this.selected.value) {
            this.board.forEach(row =>
                row.forEach(cell => {
                    cell.isEqual = this.selected.value === cell.value;
                })
            );
        }
    };

    flagConflicts = (): void => {
        if (this.selected && this.selected.value) {
            const cellConflicts = findConflicts(
                this.board,
                this.selected.location,
                this.selected.value,
                this.degree
            );
            if (
                cellConflicts.length > 0 &&
                !this.conflicts
                    .map(arr => arr[0])
                    .includes(this.selected.location)
            ) {
                this.selected.isConflict = true;
                const locations = [this.selected.location];
                cellConflicts.forEach(cell => {
                    cell.isConflict = true;
                    locations.push(cell.location);
                });
                this.conflicts.push(locations);
            }
        }
    };

    addSelectionFlags = (): void => {
        this.flagPeers();
        this.flagEquals();
    };

    removeSelectionFlags = (): void => {
        this.board.forEach(row =>
            row.forEach(cell => {
                cell.isPeer = false;
                cell.isEqual = false;
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
        this.removeSelectionFlags();
        this.selected.isSelected = false;
        this.selected = null;
    };

    select = ({ row, col }: Sudoku.Location): void => {
        if (this.selected) this.deselect();
        this.selected = this.board[row][col];
        this.selected.isSelected = true;
        this.addSelectionFlags();
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
        }
        this.addSelectionFlags();
    };

    write = (number: number): void => {
        this.removeSelectionFlags();
        if (
            this.selected &&
            !this.selected.isPrefilled &&
            this.selected.value !== number
        ) {
            this.decreaseProgress(this.selected.value);
            this.selected.value = number;
            this.increaseProgress(number);
            this.checkCompleted();
            this.flagConflicts();
            this.checkConflicts();
            this.addSelectionFlags();
        }
    };

    solve = (): boolean => {
        return solvePuzzle(this.board, this.degree);
    };
}
