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

        this.solution = [...Array(degree)].map((row: Sudoku.Location["row"]) =>
            [...Array(degree)].map((col: Sudoku.Location["col"]) => ({
                value: null,
                location: { row, col }
            }))
        );

        this.board = [...Array(degree)].map((row: Sudoku.Location["row"]) =>
            [...Array(degree)].map((col: Sudoku.Location["col"]) => ({
                value: null,
                notes: Array<boolean>(degree + 1).fill(false),
                isPrefilled: false,
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

    unflagConflicts = (): void => {
        const conflicts = findConflicts(
            this.board,
            this.selected.location,
            this.selected.value,
            this.degree
        );
        for (let c of conflicts) {
            c.isConflict = false;
        }
    };

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

    removeFlags = (): void => {
        this.unflagConflicts();
    };

    addFlags = (): void => {
        this.flagConflicts();
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
        this.selected.location = { row, col }; // TODO: Why is this necessary?
        this.addFlags();
    };

    erase = (): void => {
        this.removeFlags();
        if (
            this.selected &&
            this.selected.value !== null &&
            !this.selected.isPrefilled
        ) {
            this.progress[this.selected.value] -= 1 / this.degree;
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
            this.progress[number] += 1 / this.degree;
        }
        this.addFlags();
    };

    solve = (): boolean => {
        return solvePuzzle(this.board, this.degree);
    };
}
