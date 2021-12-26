import styled, { css } from 'styled-components/native'

export const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
`

export const Grid = styled.View<{ size: number; darkMode: boolean }>`
  ${({ theme, size, darkMode }) =>
    css`
      flex-flow: column nowrap;
      height: ${size}px;
      aspect-ratio: 1;
      border-width: 2px;
      border-color: ${darkMode
        ? theme['border-basic-color-4']
        : theme['border-alternative-color-4']};
    `}
`

export const Row = styled.View`
  flex: 1;
  flex-flow: row nowrap;
`
