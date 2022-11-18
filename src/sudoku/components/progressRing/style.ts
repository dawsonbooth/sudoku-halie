import { Svg } from 'react-native-svg'
import styled from 'styled-components/native'

export const Container = styled.View<{ radius: number }>`
  height: ${({ radius }) => 2 * radius}px;
  width: ${({ radius }) => 2 * radius}px;
`

export const AbsoluteContainer = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`

export const AbsoluteSvg = styled(Svg)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`
