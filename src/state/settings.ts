import produce from 'immer'
import { SettingsSlice, SliceCreator } from './types'

const createSettingsSlice: SliceCreator<SettingsSlice> = set => ({
  settings: {
    app: {
      darkMode: false,
    },
    sudoku: {
      dotNotes: false,
      showCompleted: true,
      showPeers: true,
      showEqual: true,
      showConflicts: true,
    },
  },
  updateSettings: settings =>
    set(
      produce((state: SettingsSlice) => {
        state.settings = settings
      })
    ),
})

export default createSettingsSlice
