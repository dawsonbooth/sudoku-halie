import styled, { css } from "styled-components/native";

export const Button = styled.TouchableOpacity<{
  degree: number;
  row: number;
  column: number;
  backgroundColor: string;
  borderColor: string;
}>`
  flex: 1;
  align-items: center;
  justify-content: center;
  ${({ degree, row, column, backgroundColor, borderColor }) => css`
    background-color: ${backgroundColor};
    border-top-width: ${row % Math.sqrt(degree) == 0 ? 2 : 1}px;
    border-left-width: ${column % Math.sqrt(degree) == 0 ? 2 : 1}px;
    border-bottom-width: ${(row + 1) % Math.sqrt(degree) == 0 ? 2 : 1}px;
    border-right-width: ${(column + 1) % Math.sqrt(degree) == 0 ? 2 : 1}px;
    border-color: ${borderColor};
  `}
`;

export const Value = styled.Text<{
  degree: number;
  boardSize: number;
  isPrefilled: boolean;
  color: string;
}>`
  color: ${({ color }) => color};
  font-size: ${({ boardSize, degree }) => 0.75 * (boardSize / degree)}px;
  font-weight: ${(isPrefilled) => (isPrefilled ? "bold" : "normal")};
`;
