import AsyncStorage from '@react-native-async-storage/async-storage'
import { enablePatches } from 'immer'
import create from 'zustand'
import { persist } from 'zustand/middleware'
import createGameSlice from './game'
import createSettingsSlice from './settings'
import { Store } from './types'

enablePatches()

export const useStore = create<Store>(
  persist(
    (...args) => ({
      ...createGameSlice(...args),
      ...createSettingsSlice(...args),
    }),
    {
      name: 'sudoku-halie-storage',
      getStorage: () => AsyncStorage,
    }
  )
)
