import _ from "lodash";

export function findConflicts(
    board: Sudoku.Game["board"],
    { row, col }: Sudoku.Location,
    value: Sudoku.Cell["value"],
    degree: Sudoku.Settings["degree"]
): Array<Sudoku.Cell> {
    const conflicts = new Array<Sudoku.Cell>();
    const unit = Math.sqrt(degree);
    for (let i = 0; i < degree; i++) {
        const m = unit * Math.floor(row / unit) + Math.floor(i / unit);
        const n = unit * Math.floor(col / unit) + (i % unit);
        if (board[row][i].value == value) conflicts.push(board[row][i]);
        if (board[i][col].value == value) conflicts.push(board[i][col]);
        if (board[m][n].value == value) conflicts.push(board[m][n]);
    }
    return conflicts;
}

export function prefill(
    board: Sudoku.Game["board"],
    solution: Sudoku.Game["board"],
    prefilledRatio: number,
    degree: Sudoku.Settings["degree"]
): void {
    let filledRatio = 0;
    while (filledRatio < prefilledRatio) {
        for (let r = 0; r < degree && filledRatio < prefilledRatio; r++) {
            for (let c = 0; c < degree && filledRatio < prefilledRatio; c++) {
                if (
                    board[r][c].value == null &&
                    Math.random() < prefilledRatio
                ) {
                    board[r][c].value = solution[r][c].value;
                    board[r][c].isPrefilled = true;
                    filledRatio += 1 / (degree * degree);
                }
            }
        }
    }
}

export function solvePuzzle(
    board: Sudoku.Game["board"],
    degree: Sudoku.Settings["degree"]
): boolean {
    const values = _.shuffle(_.range(1, degree + 1));
    for (let r = 0; r < degree; r++) {
        for (let c = 0; c < degree; c++) {
            if (board[r][c].value == null) {
                for (let value of values) {
                    if (
                        findConflicts(board, { row: r, col: c }, value, degree)
                            .length == 0
                    ) {
                        board[r][c].value = value;
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
