namespace Sudoku {
    type Game = import("./Game");

    type Conflicts = import("./Game").Conflicts;

    interface Cell {
        value: number;
        notes?: boolean[];
        isPrefilled?: boolean;
        isSelected?: boolean;
        isCompleted?: boolean;
        isPeer?: boolean;
        isEqual?: boolean;
        isConflict?: boolean;
        solution?: number;
        location: Sudoku.Location;
    }

    interface Colors {
        board: {
            border: string;
            cell: {
                background: {
                    normal: string;
                    prefilled: string;
                    peer: string;
                    equal: string;
                    conflict: string;
                    selected: string;
                    completed: string;
                };
                number: {
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
        prefilledRatio: number;
        dotNotes: boolean;
        showCompleted: boolean;
        showPeers: boolean;
        showEqual: boolean;
        showConflicts: boolean;
    }

    interface Location {
        row: number;
        col: number;
    }
}
