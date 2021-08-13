import React from "react";
import { useScreenDimensions } from "react-native-use-dimensions";
import { useGame } from "../hooks";
import defaultColors, { ColorsContext } from "../colors";
import defaultSettings, { SettingsContext } from "../settings";
import Board from "./Board";
import Controls from "./Controls";
import { View } from "react-native";
import { Game, Settings, Colors } from "../types";

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
  const boardSize = Math.min(height * 0.5, width * 0.9);

  const controlsSize = width;

  return (
    <ColorsContext.Provider value={colors}>
      <SettingsContext.Provider value={settings}>
        <View style={{ height: "100%", width: "100%" }}>
          <Board
            board={game.board}
            handleCellPress={handleCellPress}
            size={boardSize}
          />
          <Controls
            progress={game.progress}
            size={controlsSize}
            notesMode={notesMode}
            handleNotesButtonPress={handleNotesButtonPress}
            handleEraserButtonPress={handleEraserButtonPress}
            handleRevealButtonPress={handleRevealButtonPress}
            handleNumberButtonPress={handleNumberButtonPress}
          />
        </View>
      </SettingsContext.Provider>
    </ColorsContext.Provider>
  );
};

export default Sudoku;
