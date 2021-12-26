import _ from 'lodash'
import React from 'react'
import { PixelRatio } from 'react-native'
import ProgressCircle from 'react-native-progress-circle'
import { useTheme } from 'styled-components/native'
import { Store, useStore } from '../../../state'
import { Button, Note, Number, Wrapper } from './styles'

interface NumberButtons {
  size: number
}

const selector = (state: Store) => ({
  degree: state.game?.degree,
  progress: state.game?.progress,
  notesMode: state.notesMode,
  darkMode: state.settings.app.darkMode,
  handleNumberButtonPress: state.handleNumberButtonPress,
})

const NumberButtons: React.FC<NumberButtons> = ({ size }) => {
  const { degree, progress, notesMode, darkMode, handleNumberButtonPress } = useStore(selector)

  const theme = useTheme()

  if (!progress) return null

  return (
    <Wrapper>
      {_.range(0, degree).map((_, i) => {
        const number = i + 1
        const percent = progress[number] * 100
        const radius = size / 14
        return (
          <Button
            key={`number-button-${number}`}
            onPress={() => handleNumberButtonPress(number)}
            radius={radius}
          >
            {notesMode ? (
              <Note allowFontScaling={false} radius={radius}>
                {number}
              </Note>
            ) : (
              <ProgressCircle
                percent={percent}
                radius={PixelRatio.roundToNearestPixel(radius)}
                borderWidth={radius / 4}
                color={
                  percent < 100
                    ? darkMode
                      ? theme['color-primary-hover']
                      : theme['color-info-hover']
                    : theme['color-success-hover']
                }
                shadowColor={
                  darkMode ? theme['background-basic-color-2'] : theme['background-basic-color-4']
                }
                bgColor={theme['background-basic-color-1']}
              >
                <Number allowFontScaling={false} radius={radius}>
                  {number}
                </Number>
              </ProgressCircle>
            )}
          </Button>
        )
      })}
    </Wrapper>
  )
}

export default NumberButtons
