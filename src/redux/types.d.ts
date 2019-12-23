namespace Redux {
    interface State {
        board: Sudoku.Game["board"] | null;
        settings: Redux.Settings;
    }

    interface Settings {
        sudoku: Sudoku.Settings;
        app: {
            darkMode: boolean;
        };
    }

    interface Action {
        type: String;
        board?: Sudoku.Game;
        settings?: Sudoku.Settings;
    }
}
