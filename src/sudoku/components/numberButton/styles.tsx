import styled, { css } from "styled-components/native";

export const Button = styled.TouchableOpacity`
  ${({ radius }: { radius: number }) => css`
    margin: ${radius / 5}px;
  `}
`;

export const Note = styled.Text`
  ${({ radius, color }: { radius: number; color: string }) => css`
    margin-horizontal: ${radius * 0.4}px;
    font-size: ${radius * 2}px;
    color: ${color};
  `}
`;

export const Number = styled.Text`
  ${({ radius, color }: { radius: number; color: string }) => css`
    font-size: ${radius * 1.25}px;
    color: ${color};
  `}
`;
