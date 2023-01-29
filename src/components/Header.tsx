import { TopNavigation } from '@ui-kitten/components'
import React, { ReactElement } from 'react'

interface HeaderProps {
  title?: string
  accessoryLeft?: () => ReactElement
  accessoryRight?: () => ReactElement
}

const Header = ({ title, accessoryLeft, accessoryRight }) => {
  return (
    <TopNavigation
      title={title}
      alignment="center"
      accessoryLeft={accessoryLeft}
      accessoryRight={accessoryRight}
    />
  )
}

export default Header
