namespace Redux {
    interface State {
        settings: Redux.Settings;
    }

    interface Settings {
        sudoku: Sudoku.Settings;
        app: App.Settings;
    }

    interface Action {
        type: String;
        settings?: Sudoku.Settings;
    }
}