namespace Redux {
    interface State {
        game: Sudoku.Game | null;
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
        game?: Sudoku.Game;
        settings?: Sudoku.Settings;
    }
}
