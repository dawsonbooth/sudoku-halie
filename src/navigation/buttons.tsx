import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Icon, TopNavigationAction } from '@ui-kitten/components'
import { RenderFCProp } from '@ui-kitten/components/devsupport'
import React from 'react'
import { Alert, ImageProps } from 'react-native'
import i18n from '../locales'
import { Store, useStore } from '../state'
import { StackParamList } from './AppNavigator'

const BackIcon: RenderFCProp<Partial<ImageProps>> = style => (
  <Icon {...style} name="arrow-ios-back" />
)

const PencilIcon: RenderFCProp<Partial<ImageProps>> = style => <Icon {...style} name="edit" />

const SettingsIcon: RenderFCProp<Partial<ImageProps>> = style => <Icon {...style} name="settings" />

export const BackButton: React.FC = () => {
  const { goBack } = useNavigation()

  return <TopNavigationAction onPress={goBack} icon={BackIcon} />
}

const selector = (state: Store) => state.endGame

export const NewGameButton: React.FC = () => {
  const endGame = useStore(selector)
  const { navigate } = useNavigation<StackNavigationProp<StackParamList>>()

  return (
    <TopNavigationAction
      onPress={() =>
        Alert.alert(
          i18n.t('alert.newGame.title'),
          i18n.t('alert.newGame.message'),
          [
            {
              text: i18n.t('alert.cancel'),
              style: 'cancel',
            },
            {
              text: i18n.t('alert.ok'),
              onPress: () => {
                navigate('NewGame')
                endGame()
              },
            },
          ],
          { cancelable: false },
        )
      }
      icon={PencilIcon}
    />
  )
}

export const SettingsButton: React.FC = () => {
  const { navigate } = useNavigation<StackNavigationProp<StackParamList>>()

  return <TopNavigationAction onPress={() => navigate('Settings')} icon={SettingsIcon} />
}
