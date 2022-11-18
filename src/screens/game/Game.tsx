import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import Screen from '../../components/Screen'
import i18n from '../../locales'
import { StackParamList } from '../../navigation/AppNavigator'
import { NewGameButton, SettingsButton } from '../../navigation/buttons'
import Sudoku from '../../sudoku'

interface GameProps {
  navigation: StackNavigationProp<StackParamList>
}

const Game: React.FC<GameProps> = () => {
  return (
    <Screen title={i18n.t('game.title')} headerLeft={SettingsButton} headerRight={NewGameButton}>
      <Sudoku />
    </Screen>
  )
}

export default Game
