import _ from "lodash";

export function findPeers(
    board: Sudoku.Game["board"],
    { row, col }: Sudoku.Location,
    degree: Sudoku.Settings["degree"]
): Array<Sudoku.Cell> {
    const peers = new Array<Sudoku.Cell>();
    const unit = Math.sqrt(degree);
    const m_edge = unit * Math.floor(row / unit);
    const n_edge = unit * Math.floor(col / unit);
    for (let i = 0; i < degree; i++) {
        const m = m_edge + Math.floor(i / unit);
        const n = n_edge + (i % unit);
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
    const conflicts = findPeers(board, { row, col }, degree).filter(
        cell => cell.value == value
    );
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
                        board[r][c].solution = value;
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
    prefilledRatio: number,
    degree: Sudoku.Settings["degree"]
): void {
    const ratioIncrement = 1 / (degree * degree);
    let filledRatio = 0;
    for (let r = 0; r < degree; r++) {
        for (let c = 0; c < degree; c++) {
            board[r][c].value = null;
            if (
                filledRatio < prefilledRatio &&
                Math.random() < prefilledRatio
            ) {
                board[r][c].value = board[r][c].solution;
                board[r][c].isPrefilled = true;
                filledRatio += ratioIncrement;
            }
        }
    }
}
