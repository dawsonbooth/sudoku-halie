import { StackNavigationProp } from '@react-navigation/stack'
import { Button } from '@ui-kitten/components'
import React from 'react'
import Screen from '../../components/Screen'
import { StackParamList } from '../../navigation/AppNavigator'
import { Store, useStore } from '../../state'

interface HomeProps {
  navigation: StackNavigationProp<StackParamList>
}

const selector = (state: Store) => state.game

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const game = useStore(selector)

  return (
    <Screen>
      <Button
        appearance="ghost"
        onPress={() => {
          if (game) navigation.navigate('Game')
          else navigation.navigate('NewGame')
        }}
      >
        Play Game
      </Button>
    </Screen>
  )
}

export default Home
