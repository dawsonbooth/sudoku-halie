import styled from 'styled-components/native'

export const Wrapper = styled.View<{ isPortrait?: boolean }>`
  flex: 1;
  padding: 10px;
  flex-flow: ${({ isPortrait }) => (isPortrait ? 'column' : 'row')} nowrap;
  align-items: center;
`
