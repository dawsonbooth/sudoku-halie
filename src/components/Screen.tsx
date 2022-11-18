import { Layout } from '@ui-kitten/components'
import React, { VoidFunctionComponent } from 'react'
import styled from 'styled-components/native'
import Header from './Header'

const Wrapper = styled.SafeAreaView`
  height: 100%;
  width: 100%;
`

interface ScreenProps {
  title?: string
  headerLeft?: VoidFunctionComponent
  headerRight?: VoidFunctionComponent
  children: React.ReactNode
}

const Screen: React.FC<ScreenProps> = ({ title, headerLeft, headerRight, children }) => {
  return (
    <Layout>
      <Wrapper>
        <Header
          title={title}
          accessoryLeft={headerLeft as () => JSX.Element}
          accessoryRight={headerRight as () => JSX.Element}
        />
        {children}
      </Wrapper>
    </Layout>
  )
}

export default Screen
