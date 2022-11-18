import React from 'react'
import Animated, { useAnimatedProps, withTiming } from 'react-native-reanimated'
import { Circle } from 'react-native-svg'
import { useTheme } from 'styled-components/native'
import { Store, useStore } from '../../../state'
import { AbsoluteContainer, AbsoluteSvg, Container } from './style'

type Props = {
  radius: number
  percent: number
  children: React.ReactNode
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const DURATION = 250

const selector = (state: Store) => ({
  darkMode: state.settings.app.darkMode,
})

export const ProgressRing: React.FC<Props> = ({ radius, percent, children }) => {
  const stroke = radius / 4
  const innerRadius = radius - stroke / 2
  const circumference = 2 * Math.PI * innerRadius

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: withTiming(2 * Math.PI * ((100 - percent) / 100) * innerRadius, {
        duration: DURATION,
      }),
    }
  })

  const theme = useTheme()
  const { darkMode } = useStore(selector)

  return (
    <Container radius={radius}>
      <AbsoluteContainer>
        <AbsoluteSvg>
          <AnimatedCircle
            animatedProps={animatedProps}
            cx={radius}
            cy={radius}
            fill={'transparent'}
            r={innerRadius}
            stroke={
              percent < 100
                ? darkMode
                  ? theme['color-primary-hover']
                  : theme['color-info-hover']
                : theme['color-success-hover']
            }
            strokeDasharray={`${circumference} ${circumference}`}
            strokeWidth={stroke}
            strokeLinecap="round"
          />
        </AbsoluteSvg>
        {children}
      </AbsoluteContainer>
    </Container>
  )
}
