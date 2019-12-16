import { prefill, solvePuzzle, findConflicts } from "./utils";

export default class Game {
    degree: Sudoku.Settings["degree"];
    board: Sudoku.Game["board"];
    selected: Sudoku.Game["selected"];
    progress: Sudoku.Game["progress"];
    solution: Sudoku.Game["board"];

    constructor(degree: number, prefilledRatio: number) {
        if (!(degree >= 0 && Math.sqrt(degree) % 1 === 0))
            throw TypeError("degree setting must be a perfect square");
        if (prefilledRatio > 1 || prefilledRatio < 0)
            throw TypeError("prefilledRatio prop must be between 0 and 1");

        this.degree = degree;

        this.solution = [...Array(degree)].map(
            (_, row: Sudoku.Location["row"]) =>
                [...Array(degree)].map((_, col: Sudoku.Location["col"]) => ({
                    value: null,
                    location: { row, col }
                }))
        );

        this.board = [...Array(degree)].map((_, row: Sudoku.Location["row"]) =>
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

        this.selected = null;
        this.progress = [...Array(degree + 1)].map(() => 0);

        solvePuzzle(this.solution, this.degree);

        prefill(this.board, this.solution, prefilledRatio, this.degree);
        for (let r of this.board)
            for (let cell of r)
                if (cell.value !== null)
                    this.progress[cell.value] += 1 / this.degree;
    }

    flagConflicts = (): void => {
        if (this.selected.value !== null) {
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

    unflagConflicts = (): void => {
        this.board.forEach(row =>
            row.forEach(cell => {
                if (cell.isConflict) cell.isConflict = false;
            })
        );
    };

    flagCompleted = (): void => {
        this.board.forEach(row =>
            row.forEach(cell => {
                if (this.progress[cell.value] >= 1) cell.isCompleted = true;
                else cell.isCompleted = false;
            })
        );
    };

    unflagCompleted = (): void => this.flagCompleted();

    addFlags = (): void => {
        this.flagCompleted();
        this.flagConflicts();
    };

    removeFlags = (): void => {
        this.unflagCompleted();
        this.unflagConflicts();
    };

    increaseProgress = (number: number, selected: Sudoku.Cell) => {
        this.progress[number] += 1 / this.degree;
    };

    decreaseProgress = (number: number, selected: Sudoku.Cell) => {
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
            this.decreaseProgress(this.selected.value, this.selected);
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
            this.increaseProgress(number, this.selected);
        }
        this.addFlags();
    };

    solve = (): boolean => {
        return solvePuzzle(this.board, this.degree);
    };
}
