import { Patch } from 'immer'
import { GetState, SetState, StoreApi } from 'zustand'
import { Game, Location, NewGameOptions } from '../sudoku/types'

export type Store = GameSlice & SettingsSlice

export type GameSlice = {
  game: Game | null
  notesMode: boolean
  past: Patch[][]
  future: Patch[][]
  startGame: (options: NewGameOptions) => void
  endGame: () => void
  handleCellPress: (location: Location) => void
  handleNotesButtonPress: () => void
  handleEraserButtonPress: () => void
  handleRevealButtonPress: () => void
  handleNumberButtonPress: (number: number) => void
  handleUndoButtonPress: () => void
  handleRedoButtonPress: () => void
}

export type SettingsSlice = {
  settings: Settings
  updateSettings: (settings: Settings) => void
}

export type SliceCreator<TSlice extends Partial<Store>> = (
  set: SetState<Store>,
  get: GetState<TSlice>,
  api: StoreApi<Store>,
) => TSlice

export interface Settings {
  app: {
    darkMode: boolean
  }
  sudoku: {
    dotNotes: boolean
    showCompleted: boolean
    showPeers: boolean
    showEqual: boolean
    showConflicts: boolean
  }
}
