import produce from 'immer'
import * as Game from '../sudoku/game' // TODO: New library for game logic
import * as Sudoku from '../sudoku/types'
import { GameSlice, SliceCreator } from './types'

const createGameSlice: SliceCreator<GameSlice> = set => ({
  game: null,
  notesMode: false,
  startGame: (options: Sudoku.NewGameOptions) =>
    set(
      produce((state: GameSlice) => {
        state.game = Game.newGame(options)
      })
    ),
  endGame: () =>
    set(
      produce((state: GameSlice) => {
        state.game = null
      })
    ),
  handleCellPress: location =>
    set(
      produce((state: GameSlice) => {
        if (state.game) Game.select(state.game, location)
      })
    ),
  handleNotesButtonPress: () =>
    set(
      produce((state: GameSlice) => {
        if (state.game) state.notesMode = !state.notesMode
      })
    ),
  handleEraserButtonPress: () =>
    set(
      produce((state: GameSlice) => {
        if (state.game) Game.erase(state.game)
      })
    ),
  handleRevealButtonPress: () =>
    set(
      produce((state: GameSlice) => {
        if (state.game) Game.reveal(state.game)
      })
    ),
  handleNumberButtonPress: num =>
    set(
      produce((state: GameSlice) => {
        if (state.game)
          if (state.notesMode) Game.toggleNote(state.game, num)
          else Game.write(state.game, num)
      })
    ),
})

export default createGameSlice
