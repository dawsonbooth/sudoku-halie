namespace Redux {
    interface State {
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
        settings?: Sudoku.Settings;
    }
}