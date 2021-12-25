import { PixelRatio } from 'react-native'
import styled, { css } from 'styled-components/native'

export const Grid = styled.View<{ size: number; darkMode: boolean }>`
  ${({ theme, size, darkMode }) =>
    css`
      display: flex;
      flex-direction: column;
      height: ${size}px;
      margin: ${PixelRatio.roundToNearestPixel(0.05 * size)}px;
      border-width: 2px;
      border-color: ${darkMode
        ? theme['border-basic-color-4']
        : theme['border-alternative-color-4']};
    `}
`

export const Row = styled.View`
  flex: 1;
  flex-direction: row;
`
