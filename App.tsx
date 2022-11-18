import { dark, light, mapping } from '@eva-design/eva'
import { ApplicationProvider, IconRegistry, useTheme } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import React from 'react'
import { StatusBar } from 'react-native'
import 'react-native-gesture-handler'
import { ThemeProvider as SCThemeProvider } from 'styled-components/native'
import AppNavigator from './src/navigation/AppNavigator'
import { Store, useStore } from './src/state'

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme()
  return <SCThemeProvider theme={theme}>{children}</SCThemeProvider>
}

const selector = (state: Store) => state.settings

const App: React.FC = () => {
  const settings = useStore(selector)
  const darkMode = settings.app.darkMode
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={darkMode ? dark : light}>
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
        <ThemeProvider>
          <AppNavigator />
        </ThemeProvider>
      </ApplicationProvider>
    </>
  )
}

export default App
