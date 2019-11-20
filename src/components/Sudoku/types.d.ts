namespace Sudoku {
    interface Game {
        board: Cell[9][9];
        selected: Cell;
    }

    interface Cell {
        value: number;
        notes: boolean[10];
        isSelected: boolean;
    }

    interface Settings {
        dotNotes: boolean;
        feedbackCorrect: boolean;
        feedbackIncorrect: boolean;
    }
}