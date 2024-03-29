import styled from 'styled-components/native'

export const Wrapper = styled.View`
  flex-flow: row wrap;
  justify-content: center;
  flex: 1;
`

export const Button = styled.TouchableOpacity<{ radius: number }>`
  height: ${({ radius }) => radius * 2}px;
  width: ${({ radius }) => radius * 2}px;
  margin: ${({ radius }) => radius / 2}px;
`

export const Note = styled.Text<{ fontSize: number; added?: boolean }>`
  font-size: ${({ fontSize }) => fontSize}px;
  color: ${({ theme, added }) =>
    added ? theme['text-basic-color'] : theme['text-disabled-color']};
`

export const Number = styled.Text<{ fontSize: number }>`
  font-size: ${({ fontSize }) => fontSize}px;
  color: ${({ theme }) => theme['text-basic-color']};
`
