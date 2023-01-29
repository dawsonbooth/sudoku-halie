import { TopNavigation } from '@ui-kitten/components'
import React, { ReactElement } from 'react'

interface HeaderProps {
  title?: string
  accessoryLeft?: () => ReactElement
  accessoryRight?: () => ReactElement
}

const Header: React.FC<HeaderProps> = ({ title, accessoryLeft, accessoryRight }) => {
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
