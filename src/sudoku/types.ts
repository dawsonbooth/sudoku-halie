export interface Game {
  degree: Settings["degree"];
  board: Cell[][];
  selected: Location | null;
  progress: number[];
}

export interface Cell {
  value: number;
  notes: boolean[];
  isPrefilled: boolean;
  isSelected: boolean;
  isCompleted: boolean;
  isPeer: boolean;
  isEqual: boolean;
  isConflict: boolean;
  solution: number;
  location: Location;
}

export interface Location {
  row: number;
  col: number;
}

export interface Colors {
  text: string;
  board: {
    border: string;
    cell: {
      normal: string;
      peer: string;
      equal: string;
      conflict: string;
      selected: string;
      completed: string;
    };
  };
  controls: {
    numberButton: {
      background: string;
      border: string;
      progress: string;
      completed: string;
    };
  };
}

export interface Settings {
  degree: number;
  prefilledRatio: number;
  dotNotes: boolean;
  showCompleted: boolean;
  showPeers: boolean;
  showEqual: boolean;
  showConflicts: boolean;
}
