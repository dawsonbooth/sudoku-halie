import _ from "lodash";

export function findPeers(
    board: Sudoku.Game["board"],
    { row, col }: Sudoku.Location,
    degree: Sudoku.Settings["degree"]
): Array<Sudoku.Cell> {
    const peers = new Array<Sudoku.Cell>();
    const unit = Math.sqrt(degree);
    for (let i = 0; i < degree; i++) {
        const m = unit * Math.floor(row / unit) + Math.floor(i / unit);
        const n = unit * Math.floor(col / unit) + (i % unit);
        if (i !== col) peers.push(board[row][i]);
        if (i !== row) peers.push(board[i][col]);
        if (m !== row && n !== col) peers.push(board[m][n]);
    }
    return peers;
}

export function findConflicts(
    board: Sudoku.Game["board"],
    { row, col }: Sudoku.Location,
    value: Sudoku.Cell["value"],
    degree: Sudoku.Settings["degree"]
): Array<Sudoku.Cell> {
    const conflicts = new Array<Sudoku.Cell>();
    findPeers(board, { row, col }, degree).forEach(cell => {
        if (cell.value == value) conflicts.push(cell);
    });
    return conflicts;
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
