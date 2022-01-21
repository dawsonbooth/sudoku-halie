import produce, { applyPatches, produceWithPatches } from 'immer'
import * as Game from '../sudoku/game' // TODO: New library for game logic
import * as Sudoku from '../sudoku/types'
import { GameSlice, SliceCreator } from './types'

const operation = (state: GameSlice, gameRecipe: (game: GameSlice['game']) => void) => {
  const [nextGame, , diff] = produceWithPatches(gameRecipe)(state.game)
  state.game = nextGame
  state.past.push(diff)
  state.future = []
}

const createGameSlice: SliceCreator<GameSlice> = set => ({
  game: null,
  notesMode: false,
  past: [],
  future: [],
  startGame: (options: Sudoku.NewGameOptions) =>
    set(
      produce<GameSlice>(state => {
        state.game = Game.newGame(options)
      })
    ),
  endGame: () =>
    set(
      produce<GameSlice>(state => {
        state.game = null
        state.past = []
        state.future = []
      })
    ),
  handleCellPress: location =>
    set(
      produce<GameSlice>(state => {
        if (state.game) Game.select(state.game, location)
      })
    ),
  handleNotesButtonPress: () =>
    set(
      produce<GameSlice>(state => {
        if (state.game) state.notesMode = !state.notesMode
      })
    ),
  handleEraserButtonPress: () =>
    set(
      produce<GameSlice>(state => {
        operation(state, game => {
          if (game) Game.erase(game)
        })
      })
    ),
  handleRevealButtonPress: () =>
    set(
      produce<GameSlice>(state => {
        operation(state, game => {
          if (game) Game.reveal(game)
        })
      })
    ),
  handleNumberButtonPress: num =>
    set(
      produce<GameSlice>(state => {
        operation(state, game => {
          if (game) {
            if (state.notesMode) Game.toggleNote(game, num)
            else Game.write(game, num)
          }
        })
      })
    ),
  handleUndoButtonPress: () =>
    set(
      produce<GameSlice>(state => {
        if (state.game) {
          const diff = state.past.pop()
          if (diff) {
            const [nextGame, , newDiff] = produceWithPatches(game => {
              applyPatches(game, diff)
            })(state.game)
            state.game = nextGame
            state.future.push(newDiff)
          }
        }
      })
    ),
  handleRedoButtonPress: () =>
    set(
      produce<GameSlice>(state => {
        if (state.game) {
          const diff = state.future.pop()
          if (diff) {
            const [nextGame, , newDiff] = produceWithPatches(game => {
              applyPatches(game, diff)
            })(state.game)
            state.game = nextGame
            state.past.push(newDiff)
          }
        }
      })
    ),
})

export default createGameSlice
