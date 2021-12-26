import React from 'react'
import { Store, useStore } from '../../../state'
import * as Sudoku from '../../types'
import Cell from '../cell'
import { Grid, Row, Wrapper } from './styles'

interface BoardProps {
  size: number
}

const selector = (state: Store) => ({
  darkMode: state.settings.app.darkMode,
  board: state.game?.board,
  handleCellPress: state.handleCellPress,
})

const Board: React.FC<BoardProps> = ({ size }) => {
  const { darkMode, board, handleCellPress } = useStore(selector)

  if (!board) return null

  return (
    <Wrapper>
      <Grid size={size} darkMode={darkMode}>
        {board.map((row: Sudoku.Cell[], r: Sudoku.Location['row']) => (
          <Row key={`board-row-${r}`}>
            {row.map((cell: Sudoku.Cell, c: Sudoku.Location['col']) => (
              <Cell
                key={`board-cell-${c}`}
                row={r}
                column={c}
                {...cell}
                onPress={() => handleCellPress({ row: r, col: c })}
                boardSize={size}
              />
            ))}
          </Row>
        ))}
      </Grid>
    </Wrapper>
  )
}

export default Board
