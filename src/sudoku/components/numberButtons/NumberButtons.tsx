import _ from 'lodash'
import React from 'react'
import { Store, useStore } from '../../../state'
import { ProgressRing } from '../progressRing/ProgressRing'
import { Button, Note, Number, Wrapper } from './style'

interface NumberButtons {
  size: number
}

const selector = (state: Store) => {
  const selected = state.game?.selected
  const notes = selected ? state.game?.board?.[selected.row][selected.col].notes : null

  return {
    degree: state.game?.degree,
    progress: state.game?.progress,
    notes,
    notesMode: state.notesMode,
    handleNumberButtonPress: state.handleNumberButtonPress,
  }
}

const NumberButtons: React.FC<NumberButtons> = ({ size }) => {
  const { degree, progress, notes, notesMode, handleNumberButtonPress } = useStore(selector)

  if (!progress || !notes) return null

  return (
    <Wrapper>
      {_.range(0, degree).map((_, i) => {
        const num = i + 1
        const percent = progress[num] * 100
        const radius = size / 16
        return (
          <Button
            key={`number-button-${num}`}
            onPress={() => handleNumberButtonPress(num)}
            radius={radius}
          >
            {notesMode ? (
              <Note allowFontScaling={false} fontSize={radius * 2} added={notes[num]}>
                {num}
              </Note>
            ) : (
              <ProgressRing radius={radius} percent={percent}>
                <Number allowFontScaling={false} fontSize={radius * 1.1}>
                  {num}
                </Number>
              </ProgressRing>
            )}
          </Button>
        )
      })}
    </Wrapper>
  )
}

export default NumberButtons
