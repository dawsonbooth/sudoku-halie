import styled from 'styled-components/native'

export const Wrapper = styled.View`
  flex-flow: row wrap;
  justify-content: center;
  flex: 1;
`

export const Button = styled.TouchableOpacity<{ radius: number }>`
  margin: ${({ radius }) => radius / 5}px;
`

export const Note = styled.Text<{ radius: number }>`
  font-size: ${({ radius }) => radius * 2}px;
  color: ${({ theme }) => theme['text-basic-color']};
`

export const Number = styled.Text<{ radius: number }>`
  font-size: ${({ radius }) => radius * 1.25}px;
  color: ${({ theme }) => theme['text-basic-color']};
`
