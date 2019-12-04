export default class Game {
    degree: Sudoku.Settings["degree"];
    board: Sudoku.Game["board"];
    selected: Sudoku.Game["selected"];
    progress: Sudoku.Game["progress"];

    constructor(degree: number, prefilledRatio: number) { // TODO: Prefill with random numbers
        if (!(degree >= 0 && Math.sqrt(degree) % 1 === 0))
            throw TypeError("degree setting must be a perfect square");
        if (prefilledRatio > 1 || prefilledRatio < 0)
            throw TypeError("prefilledRatio prop must be between 0 and 1");

        this.degree = degree;

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
    }

    select = (row: number, col: number) => {
        if (this.selected) {
            this.selected.isSelected = false;
        }
        this.board[row][col].isSelected = true;
        this.selected = this.board[row][col];
    };

    erase = () => {
        if (this.selected && this.selected.value !== null) {
            this.progress[this.selected.value] -= 1 / this.degree;
            this.selected.value = null;
        }
    };

    write = (number: number) => {
        if (this.selected && this.selected.value !== number) {
            this.erase();
            this.selected.value = number;
            this.progress[number] += 1 / this.degree;
        }
    };
}
