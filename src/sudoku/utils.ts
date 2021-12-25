import _ from 'lodash'
import { Cell as GameCell, Location } from './types'

type Cell = Pick<GameCell, 'value' | 'location'>

export function findPeers(board: Cell[][], { row, col }: Location, degree: number): Cell[] {
  const peers: Cell[] = []
  const unit = Math.sqrt(degree)
  const m_edge = unit * Math.floor(row / unit)
  const n_edge = unit * Math.floor(col / unit)
  for (let i = 0; i < degree; i++) {
    const m = m_edge + Math.floor(i / unit)
    const n = n_edge + (i % unit)
    if (i !== col) peers.push(board[row][i])
    if (i !== row) peers.push(board[i][col])
    if (m !== row && n !== col) peers.push(board[m][n])
  }
  return peers
}

export function findConflicts(
  board: Cell[][],
  location: Location,
  value: number,
  degree: number
): Cell[] {
  return findPeers(board, location, degree).filter(c => c.value > 0 && c.value === value)
}

export function solvePuzzle(board: Cell[][], degree: number): boolean {
  const values = _.shuffle(_.range(1, degree + 1))
  for (let r = 0; r < degree; r++) {
    for (let c = 0; c < degree; c++) {
      if (board[r][c].value === 0) {
        for (const value of values) {
          if (findConflicts(board, { row: r, col: c }, value, degree).length == 0) {
            board[r][c].value = value
            if (solvePuzzle(board, degree)) return true
            else board[r][c].value = 0
          }
        }
        return false
      }
    }
  }
  return true
}
