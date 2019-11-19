interface State {
    game: Game;
    count: number;
}

interface Game {
    board: Cell[9][9];
    selected: Address;
}

interface Cell {
    value: number;
    notes: boolean[10];
    isSelected: boolean;
}

interface Address {
    i: number;
    j: number;
}

interface Action { // TODO: Maybe remove redux, consider moving Sudoku types to own area in Sudoku component
    type: String;
    game?: State["game"];
}