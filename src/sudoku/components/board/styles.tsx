import { PixelRatio } from "react-native";
import styled, { css } from "styled-components/native";

export const Grid = styled.View`
  ${({ size, borderColor }: { size: number; borderColor: string }) => css`
    display: flex;
    flex-direction: column;
    height: ${size}px;
    margin: ${PixelRatio.roundToNearestPixel(0.05 * size)}px;
    border-width: 2px;
    border-color: ${borderColor};
  `}
`;

export const Row = styled.View`
  flex: 1;
  flex-direction: row;
`;
