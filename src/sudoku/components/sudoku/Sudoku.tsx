import React from 'react'
import { useWindowDimensions } from 'react-native'
import Board from '../board'
import Controls from '../controls'
import NumberButtons from '../numberButtons'
import { Wrapper } from './style'

const Sudoku: React.FC = () => {
  const { height, width } = useWindowDimensions()

  const isPortrait = height > width
  let boardSize
  let controlSize
  if (isPortrait) {
    boardSize = Math.min(0.5 * height, 0.9 * width)
    controlSize = width
  } else {
    boardSize = Math.min(0.5 * width, 0.75 * height)
    controlSize = height
  }

  return (
    <Wrapper isPortrait={isPortrait}>
      <Board size={boardSize} />
      <Controls size={controlSize} />
      <NumberButtons size={controlSize} />
    </Wrapper>
  )
}

export default Sudoku
