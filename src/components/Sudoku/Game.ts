import { prefill, solvePuzzle } from "./utils";

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

        this.solution = [...Array(degree)].map(() =>
            [...Array(degree)].map(() => ({
                value: null
            }))
        );

        this.board = [...Array(degree)].map(() =>
            [...Array(degree)].map(() => ({
                value: null,
                notes: Array<boolean>(degree + 1).fill(false),
                isPrefilled: false,
                isSelected: false,
                isPeer: false,
                isEqual: false,
                hasConflict: false
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

    select = (row: number, col: number) => {
        if (this.selected) {
            this.selected.isSelected = false;
        }
        this.board[row][col].isSelected = true;
        this.selected = this.board[row][col];
    };

    erase = (): void => {
        if (
            this.selected &&
            this.selected.value !== null &&
            !this.selected.isPrefilled
        ) {
            this.progress[this.selected.value] -= 1 / this.degree;
            this.selected.value = null;
        }
    };

    write = (number: number): void => {
        if (
            this.selected &&
            !this.selected.isPrefilled &&
            this.selected.value !== number
        ) {
            this.erase();
            this.selected.value = number;
            this.progress[number] += 1 / this.degree;
        }
    };

    solve = (): boolean => {
        return solvePuzzle(this.board, this.degree);
    };
}
