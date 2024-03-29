import styled, { css } from 'styled-components/native'

export const Grid = styled.View`
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
`

export const Row = styled.View`
  flex: 1;
  flex-direction: row;
`

export const Cell = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const Note = styled.Text<{ fontSize: number }>`
  ${({ fontSize }) => css`
    font-size: ${fontSize}px;
    line-height: ${fontSize}px;
  `}
  color: ${({ theme }) => theme['text-basic-color']};
`
