export interface Game {
  degree: number
  board: Cell[][]
  selected: Location | null
  progress: number[]
}

export interface Cell {
  value: number
  notes: boolean[]
  isPrefilled: boolean
  isSelected: boolean
  isCompleted: boolean
  isPeer: boolean
  isEqual: boolean
  isConflict: boolean
  solution: number
  location: Location
}

export interface Location {
  row: number
  col: number
}

export interface NewGameOptions {
  degree: number
  prefilledRatio: number
}
