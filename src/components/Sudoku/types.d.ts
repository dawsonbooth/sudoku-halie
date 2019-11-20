namespace Sudoku {
    interface Game {
        board: Cell[][];
        selected: Cell;
        progress: number[];
    }

    interface Cell {
        value: number;
        notes: boolean[];
        isPrefilled: boolean;
        isSelected: boolean;
        isPeer: boolean;
        isEqual: boolean;
        hasConflict: boolean;
    }

    interface Settings {
        dotNotes: boolean;
        feedbackCorrect: boolean;
        feedbackIncorrect: boolean;
    }
}
