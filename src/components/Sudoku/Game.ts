import { prefill, solvePuzzle, findConflicts, findPeers } from "./utils";

export default class Game implements Sudoku.Game {
    degree: Sudoku.Settings["degree"];
    board: Sudoku.Cell[][];
    selected: Sudoku.Cell;
    progress: number[];
    solution: Sudoku.Cell[][];

    constructor(
        degree: Sudoku.Settings["degree"],
        board: Sudoku.Cell[][],
        selected: Sudoku.Cell,
        progress: number[],
        solution: Sudoku.Cell[][]
    ) {
        this.degree = degree;
        this.board = board;
        this.selected = selected;
        this.progress = progress;
        this.solution = solution;

        this.addFlags();
    }

    static load(gameState: Sudoku.Game | null) {
        if (gameState === null) return null;

        const degree = gameState.progress.length - 1;
        const solution = [...Array(degree)].map(
            (_, row: Sudoku.Location["row"]) =>
                [...Array(degree)].map((_, col: Sudoku.Location["col"]) => ({
                    value: gameState.board[row][col].value,
                    location: { row, col }
                }))
        );
        solvePuzzle(solution, degree);

        return new this(
            degree,
            gameState.board,
            gameState.selected,
            gameState.progress,
            solution
        );
    }

    static new(degree: number, prefilledRatio: number) {
        if (!(degree >= 0 && Math.sqrt(degree) % 1 === 0))
            throw TypeError("degree setting must be a perfect square");
        if (prefilledRatio > 1 || prefilledRatio < 0)
            throw TypeError("prefilledRatio prop must be between 0 and 1");

        const solution = [...Array(degree)].map(
            (_, row: Sudoku.Location["row"]) =>
                [...Array(degree)].map((_, col: Sudoku.Location["col"]) => ({
                    value: null,
                    location: { row, col }
                }))
        );

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

    unflagCompleted = (): void => this.flagCompleted();

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
        if (this.selected !== null && this.selected.value !== null) {
            this.board.forEach(row =>
                row.forEach(cell => {
                    cell.isEqual = this.selected.value === cell.value;
                })
            );
        }
    };

    flagConflicts = (): void => {
        if (this.selected !== null && this.selected.value !== null) {
            const conflicts = findConflicts(
                this.board,
                this.selected.location,
                this.selected.value,
                this.degree
            );
            for (let c of conflicts) {
                c.isConflict = true;
            }
        }
    };

    addFlags = (): void => {
        this.flagCompleted();
        this.flagPeers();
        this.flagEquals();
        this.flagConflicts();
    };

    removeFlags = (): void => {
        this.unflagCompleted();
        this.board.forEach(row =>
            row.forEach(cell => {
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
        }
    };

    select = ({ row, col }: Sudoku.Location): void => {
        this.deselect();
        this.board[row][col].isSelected = true;
        this.selected = this.board[row][col];
        this.addFlags();
    };

    erase = (): void => {
        this.removeFlags();
        if (
            this.selected &&
            this.selected.value !== null &&
            !this.selected.isPrefilled
        ) {
            this.decreaseProgress(this.selected.value);
            this.selected.value = null;
        }
        this.addFlags();
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
