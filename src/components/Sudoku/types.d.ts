namespace Sudoku {
    interface Game {
        board: Cell[][];
        selected: Cell;
        progress: number[];
    }

    interface Cell {
        value: number;
        notes?: boolean[];
        isPrefilled?: boolean;
        isSelected?: boolean;
        isCompleted?: boolean;
        isPeer?: boolean;
        isEqual?: boolean;
        isConflict?: boolean;
        location: Sudoku.Location;
    }

    interface Colors {
        board: {
            border: string;
            cell: {
                background: {
                    normal: string;
                    peer: string;
                    equal: string;
                    conflict: string;
                    selected: string;
                    completed: string;
                };
                number: {
                    prefilled: string;
                    entry: string;
                };
            };
        };
        controls: {
            number_button: {
                background: string;
                border: string;
                progress: string;
                completed: string;
            };
        };
    }

    interface Settings {
        degree: number;
        dotNotes: boolean;
        feedbackCorrect: boolean;
        feedbackIncorrect: boolean;
    }

    interface Location {
        row: number;
        col: number;
    }
}
