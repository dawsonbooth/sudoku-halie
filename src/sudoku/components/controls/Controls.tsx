import { Icon } from '@ui-kitten/components'
import React from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import { useScreenDimensions } from 'react-native-use-dimensions'
import { useTheme } from 'styled-components/native'
import { Store, useStore } from '../../../state'
import { Wrapper } from './styles'

interface ControlsProps {
  size: number
}

const selector = (state: Store) => ({
  progress: state.game?.progress,
  undoEnabled: state.past.length > 0,
  redoEnabled: state.future.length > 0,
  darkMode: state.settings.app.darkMode,
  handleUndoButtonPress: state.handleUndoButtonPress,
  handleNotesButtonPress: state.handleNotesButtonPress,
  handleEraserButtonPress: state.handleEraserButtonPress,
  handleRevealButtonPress: state.handleRevealButtonPress,
  handleRedoButtonPress: state.handleRedoButtonPress,
})

const Controls: React.FC<ControlsProps> = ({ size }) => {
  const {
    progress,
    undoEnabled,
    redoEnabled,
    darkMode,
    handleUndoButtonPress,
    handleNotesButtonPress,
    handleEraserButtonPress,
    handleRevealButtonPress,
    handleRedoButtonPress,
  } = useStore(selector)
  const { height, width } = useScreenDimensions()
  const theme = useTheme()

  if (!progress) return null

  const isPortrait = height > width

  const disabledColor = darkMode ? 'background-basic-color-4' : 'background-basic-color-2'

  return (
    <Wrapper isPortrait={isPortrait}>
      <TouchableOpacity onPress={handleUndoButtonPress} disabled={!undoEnabled}>
        <Icon
          name="corner-up-left-outline"
          width={size / 8}
          height={size / 8}
          fill={theme[undoEnabled ? 'text-basic-color' : disabledColor]}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNotesButtonPress}>
        <Icon
          name="edit-outline"
          width={size / 8}
          height={size / 8}
          fill={theme['text-basic-color']}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          Alert.alert(
            'Reveal',
            'Are you sure you want to reveal this cell?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: handleRevealButtonPress,
              },
            ],
            { cancelable: false }
          )
        }
      >
        <Icon
          name="search-outline"
          width={size / 8}
          height={size / 8}
          fill={theme['text-basic-color']}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleEraserButtonPress}>
        <Icon
          name="trash-outline"
          width={size / 8}
          height={size / 8}
          fill={theme['text-basic-color']}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRedoButtonPress} disabled={!redoEnabled}>
        <Icon
          name="corner-up-right-outline"
          width={size / 8}
          height={size / 8}
          fill={theme[redoEnabled ? 'text-basic-color' : disabledColor]}
        />
      </TouchableOpacity>
    </Wrapper>
  )
}

export default Controls
