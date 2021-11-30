import React from "react";
import { useScreenDimensions } from "react-native-use-dimensions";
import colors, { ColorsContext } from "../colors";
import Board from "./Board";
import Controls from "./Controls";
import styled from "styled-components/native";

const Container = styled.View`
  height: 100%;
  width: 100%;
`;

const Sudoku: React.FC = () => {
  const { height, width } = useScreenDimensions();

  let boardSize;
  let controlSize;

  if (height > width) {
    boardSize = Math.min(0.5 * height, 0.9 * width);
    controlSize = width;
  } else {
    boardSize = Math.min(0.5 * width, 0.9 * height);
    controlSize = height;
  }

  return (
    <ColorsContext.Provider value={colors}>
      <Container>
        <Board size={boardSize} />
        <Controls size={controlSize} />
      </Container>
    </ColorsContext.Provider>
  );
};

export default Sudoku;
