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
  handleNotesButtonPress: state.handleNotesButtonPress,
  handleEraserButtonPress: state.handleEraserButtonPress,
  handleRevealButtonPress: state.handleRevealButtonPress,
})

const Controls: React.FC<ControlsProps> = ({ size }) => {
  const { progress, handleNotesButtonPress, handleEraserButtonPress, handleRevealButtonPress } =
    useStore(selector)
  const { height, width } = useScreenDimensions()
  const theme = useTheme()

  if (!progress) return null

  const isPortrait = height > width

  return (
    <Wrapper isPortrait={isPortrait}>
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
    </Wrapper>
  )
}

export default Controls
