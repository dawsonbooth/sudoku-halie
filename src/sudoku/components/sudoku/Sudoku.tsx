import React from "react";
import { useScreenDimensions } from "react-native-use-dimensions";
import Board from "../board";
import Controls from "../controls";
import { Wrapper } from "./styles";

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
    <Wrapper>
      <Board size={boardSize} />
      <Controls size={controlSize} />
    </Wrapper>
  );
};

export default Sudoku;
