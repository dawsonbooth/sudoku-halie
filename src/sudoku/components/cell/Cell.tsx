import React, { useMemo } from 'react'
import { GestureResponderEvent } from 'react-native'
import { Store, useStore } from '../../../state'
import * as Sudoku from '../../types'
import Notes from '../notes'
import { Button, State, Value } from './style'

interface CellProps extends Sudoku.Cell {
  row: number
  column: number
  onPress: (event: GestureResponderEvent) => void
  boardSize: number
}

const selector = (state: Store) => ({
  degree: state.game?.degree,
  darkMode: state.settings.app.darkMode,
  ...state.settings.sudoku,
})

const Cell: React.FC<CellProps> = ({
  row,
  column,
  value,
  notes,
  isPrefilled,
  isCompleted,
  isSelected,
  isPeer,
  isEqual,
  isConflict,
  onPress,
  boardSize,
}) => {
  const { degree, darkMode, showPeers, showCompleted, showEqual, showConflicts } =
    useStore(selector)

  const state = useMemo(() => {
    let color = State.NORMAL
    if (isPeer && showPeers) color = State.PEER
    if (isCompleted && showCompleted) color = State.COMPLETED
    if (isEqual && showEqual) color = State.EQUAL
    if (isConflict && showConflicts) color = State.CONFLICT
    if (isSelected) color = State.SELECTED
    return color
  }, [
    isCompleted,
    isConflict,
    isEqual,
    isPeer,
    isSelected,
    showCompleted,
    showConflicts,
    showEqual,
    showPeers,
  ])

  if (!degree) return null

  return (
    <Button
      onPress={onPress}
      degree={degree}
      row={row}
      column={column}
      state={state}
      darkMode={darkMode}
    >
      {value ? (
        <Value
          allowFontScaling={false}
          degree={degree}
          boardSize={boardSize}
          isPrefilled={isPrefilled}
        >
          {value}
        </Value>
      ) : (
        notes[0] && <Notes notes={notes} size={boardSize} />
      )}
    </Button>
  )
}

export default Cell
