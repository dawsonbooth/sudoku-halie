import React from "react";
import { useScreenDimensions } from "react-native-use-dimensions";
import { useGame } from "./hooks";
import defaultColors, { ColorsContext } from "./colors";
import defaultSettings, { SettingsContext } from "./settings";
import Game from "./Game";
import Board from "./Board";
import Controls from "./Controls";
import { View } from "react-native";

interface PropTypes {
  board?: Sudoku.Game["board"];
  onChange?: (board: Sudoku.Game["board"]) => void;
  settings?: Sudoku.Settings;
  colors?: Sudoku.Colors;
}

const _Sudoku: React.FC<PropTypes> = ({
  board = null,
  onChange = () => {},
  colors = defaultColors,
  settings = defaultSettings
}) => {
  const {
    game,
    notesMode,
    handleCellPress,
    handleNotesButtonPress,
    handleEraserButtonPress,
    handleRevealButtonPress,
    handleNumberButtonPress
  } = useGame(onChange, () =>
    board === null
      ? Game.new(settings.degree, settings.prefilledRatio)
      : Game.load(board)
  );

  const { height, width } = useScreenDimensions();
  const boardSize = Math.min(height * 0.5, width);

  const controlsSize = width;

  return (
    <ColorsContext.Provider value={colors}>
      <SettingsContext.Provider value={settings}>
        <View style={{ height: "100%", width: "100%" }}>
          <Board
            grid={game.board}
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

export default _Sudoku;
