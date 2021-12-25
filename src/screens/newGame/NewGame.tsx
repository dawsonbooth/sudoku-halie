import { StackNavigationProp } from '@react-navigation/stack'
import { Button, CheckBox, List, ListItem, Text } from '@ui-kitten/components'
import i18n from 'i18n-js'
import produce from 'immer'
import React, { useState } from 'react'
import Screen from '../../components/Screen'
import Slider from '../../components/Slider'
import { StackParamList } from '../../navigation/AppNavigator'
import { SettingsButton } from '../../navigation/buttons'
import { Settings, Store, useStore } from '../../state'
import { Wrapper, SliderLabel } from './styles'

type BooleanSudokuSettings = Omit<Settings['sudoku'], 'degree' | 'prefilledRatio'>

const options: (keyof BooleanSudokuSettings)[] = [
  'dotNotes',
  'showCompleted',
  'showPeers',
  'showEqual',
  'showConflicts',
]

interface NewGameProps {
  navigation: StackNavigationProp<StackParamList>
}

const selector = (state: Store) => ({
  settings: state.settings,
  updateSettings: state.updateSettings,
  startGame: state.startGame,
})

const NewGame: React.FC<NewGameProps> = ({ navigation }) => {
  const { settings, updateSettings, startGame } = useStore(selector)

  const [prefilledRatio, setPrefilledRatio] = useState<number>(0.4)

  const difficulties = [i18n.t('newGame.easy'), i18n.t('newGame.medium'), i18n.t('newGame.hard')]

  const difficulty = difficulties[Math.round((1 - prefilledRatio) * (difficulties.length - 1))]

  const renderItem = ({ item }: { item: keyof BooleanSudokuSettings }) => (
    <ListItem
      title={i18n.t(`settings.sudoku.items.${item}`)}
      accessoryRight={evaProps => (
        <CheckBox
          {...evaProps}
          checked={settings.sudoku[item]}
          onChange={value =>
            updateSettings(
              produce(settings, draft => {
                draft.sudoku[item] = value
              })
            )
          }
        />
      )}
      onPress={() =>
        updateSettings(
          produce(settings, draft => {
            draft.sudoku[item] = !settings.sudoku[item]
          })
        )
      }
    />
  )

  return (
    <Screen title={i18n.t('newGame.title')} headerLeft={SettingsButton}>
      <Wrapper>
        <SliderLabel>
          <Text>{`Difficulty: ${difficulty}`}</Text>
          <Text>
            Prefilled:
            {` ${Math.round(prefilledRatio * 100)}%`}
          </Text>
        </SliderLabel>
        <Slider
          value={prefilledRatio}
          onChange={setPrefilledRatio}
          onComplete={setPrefilledRatio}
        />
        <List data={options} renderItem={renderItem} scrollEnabled={false} />
        <Button
          onPress={() => {
            startGame({ degree: 9, prefilledRatio })
            navigation.navigate('Game')
          }}
        >
          {i18n.t('newGame.button')}
        </Button>
      </Wrapper>
    </Screen>
  )
}

export default NewGame
