import styled from 'styled-components/native'

export const Wrapper = styled.View<{ isPortrait?: boolean }>`
  flex-flow: row nowrap;
  justify-content: center;
  flex-flow: ${({ isPortrait }) => (isPortrait ? 'row' : 'column')} nowrap;
  margin: 10px;
`
// TODO: Replace margin-vertical with flex gap on parent when available:
// https://github.com/styled-components/styled-components/issues/3628
