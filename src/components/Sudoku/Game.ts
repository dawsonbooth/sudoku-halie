import { prefill, solvePuzzle, findConflicts, findPeers } from "./utils";

export default class Game implements Sudoku.Game {
    degree: Sudoku.Game["degree"];
    board: Sudoku.Game["board"];
    selected: Sudoku.Game["selected"];
    progress: Sudoku.Game["progress"];
    solution: Sudoku.Game["solution"];

    constructor(
        degree: Sudoku.Game["degree"],
        board: Sudoku.Game["board"],
        selected: Sudoku.Game["selected"],
        progress: Sudoku.Game["progress"],
        solution: Sudoku.Game["solution"]
    ) {
        this.degree = degree;
        this.board = board;
        this.selected = selected;
        this.progress = progress;
        this.solution = solution;

        this.addFlags();
    }

    static load(board: Sudoku.Game["board"] | null) {
        if (board === null) return null;

        const degree = board.length;

        let selected: Sudoku.Cell;

        const progress = [...Array(degree + 1)].map(() => 0);

        const solution = [...Array(degree)].map(
            (_, row: Sudoku.Location["row"]) =>
                [...Array(degree)].map((_, col: Sudoku.Location["col"]) => {
                    if (board[row][col].isSelected) selected = board[row][col];
                    progress[board[row][col].value] += 1 / degree;
                    return {
                        value: null,
                        location: { row, col }
                    };
                })
        );

        solvePuzzle(solution, degree);

        return new this(degree, board, selected, progress, solution);
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
                if (cell.value !== null) progress[cell.value] += 1 / degree;

        return new this(degree, board, selected, progress, solution);
    }

    flagCompleted = (): void => {
        this.board.forEach(row =>
            row.forEach(cell => {
                cell.isCompleted = this.progress[cell.value] >= 1;
            })
        );
    };

    flagPeers = (): void => {
        if (this.selected !== null) {
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
        if (this.selected && this.selected.value !== null) {
            this.board.forEach(row =>
                row.forEach(cell => {
                    cell.isEqual = this.selected.value === cell.value;
                })
            );
        }
    };

    flagConflicts = (): void => {
        if (this.selected && this.selected.value !== null) {
            const conflicts = findConflicts(
                this.board,
                this.selected.location,
                this.selected.value,
                this.degree
            );
            for (let c of conflicts) {
                c.isConflict = true;
            }
            this.selected.isConflict = conflicts.length > 0;
        }
    };

    addFlags = (): void => {
        this.flagCompleted();
        this.flagPeers();
        this.flagEquals();
        this.flagConflicts();
    };

    removeFlags = (): void => {
        this.board.forEach(row =>
            row.forEach(cell => {
                cell.isCompleted = this.progress[cell.value] >= 1;
                cell.isPeer = false;
                cell.isEqual = false;
                cell.isConflict = false;
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
            this.selected.isSelected = false;
            this.removeFlags();
            this.selected = null;
        }
    };

    select = ({ row, col }: Sudoku.Location): void => {
        this.deselect();
        this.board[row][col].isSelected = true;
        this.selected = this.board[row][col];
        this.addFlags();
    };

    erase = (): void => {
        const location = this.selected.location;
        if (
            this.selected &&
            this.selected.value &&
            !this.selected.isPrefilled
        ) {
            this.decreaseProgress(this.selected.value);
            this.selected.value = null;
        }
        this.select(location);
    };

    write = (number: number): void => {
        this.removeFlags();
        if (
            this.selected &&
            !this.selected.isPrefilled &&
            this.selected.value !== number
        ) {
            this.erase();
            this.selected.value = number;
            this.increaseProgress(number);
        }
        this.addFlags();
    };

    solve = (): boolean => {
        return solvePuzzle(this.board, this.degree);
    };
}
