import styled, { css } from "styled-components/native";

export enum State {
  NORMAL,
  PEER,
  COMPLETED,
  EQUAL,
  CONFLICT,
  SELECTED,
}

const backgroundColors = [
  {
    [State.NORMAL]: "background-basic-color-1",
    [State.PEER]: "color-info-200",
    [State.EQUAL]: "color-info-300",
    [State.CONFLICT]: "color-danger-300",
    [State.SELECTED]: "color-warning-200",
    [State.COMPLETED]: "color-success-200",
  },
  {
    [State.NORMAL]: "background-basic-color-1",
    [State.PEER]: "color-basic-700",
    [State.EQUAL]: "background-basic-color-2",
    [State.CONFLICT]: "color-danger-hover",
    [State.SELECTED]: "color-primary-hover",
    [State.COMPLETED]: "color-success-hover",
  },
];

export const Button = styled.TouchableOpacity<{
  degree: number;
  row: number;
  column: number;
  state: State;
  darkMode: boolean;
}>`
  flex: 1;
  align-items: center;
  justify-content: center;
  ${({ theme, degree, row, column, state, darkMode }) => css`
    background-color: ${theme[backgroundColors[Number(darkMode)][state]]};
    border-top-width: ${row % Math.sqrt(degree) == 0 ? 2 : 1}px;
    border-left-width: ${column % Math.sqrt(degree) == 0 ? 2 : 1}px;
    border-bottom-width: ${(row + 1) % Math.sqrt(degree) == 0 ? 2 : 1}px;
    border-right-width: ${(column + 1) % Math.sqrt(degree) == 0 ? 2 : 1}px;
    border-color: ${darkMode
      ? theme["border-basic-color-4"]
      : theme["border-alternative-color-4"]};
  `}
`;

export const Value = styled.Text<{
  degree: number;
  boardSize: number;
  isPrefilled: boolean;
}>`
  color: ${({ theme }) => theme["text-basic-color"]};
  font-size: ${({ boardSize, degree }) => 0.75 * (boardSize / degree)}px;
  font-weight: ${(isPrefilled) => (isPrefilled ? "bold" : "normal")};
`;
