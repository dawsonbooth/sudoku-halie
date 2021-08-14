import React from "react";
import { useScreenDimensions } from "react-native-use-dimensions";
import { useGame } from "../hooks";
import defaultColors, { ColorsContext } from "../colors";
import defaultSettings, { SettingsContext } from "../settings";
import Board from "./Board";
import Controls from "./Controls";
import { Game, Settings, Colors } from "../types";
import styled from "styled-components/native";

const Container = styled.View`
  height: 100%;
  width: 100%;
`;

interface SudokuProps {
  board?: Game["board"];
  onChange?: (board: Game["board"]) => void;
  settings?: Settings;
  colors?: Colors;
}

const Sudoku: React.FC<SudokuProps> = ({
  // TODO: Game prop, game save/load, access Game class outside of Sudoku?
  board,
  onChange,
  colors = defaultColors,
  settings = defaultSettings,
}) => {
  const {
    game,
    notesMode,
    handleCellPress,
    handleNotesButtonPress,
    handleEraserButtonPress,
    handleRevealButtonPress,
    handleNumberButtonPress,
  } = useGame(
    onChange,
    board
      ? Game.load(board)
      : Game.new(settings.degree, settings.prefilledRatio)
  );

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
      <SettingsContext.Provider value={settings}>
        <Container>
          <Board
            board={game.board}
            handleCellPress={handleCellPress}
            size={boardSize}
          />
          <Controls
            progress={game.progress}
            size={controlSize}
            notesMode={notesMode}
            handleNotesButtonPress={handleNotesButtonPress}
            handleEraserButtonPress={handleEraserButtonPress}
            handleRevealButtonPress={handleRevealButtonPress}
            handleNumberButtonPress={handleNumberButtonPress}
          />
        </Container>
      </SettingsContext.Provider>
    </ColorsContext.Provider>
  );
};

export default Sudoku;
