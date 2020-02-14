import React from "react";
import { strings } from "../constants";
import { SafeAreaView } from "react-native";
import { NewGame, Sudoku, Header } from "../components";
import { Layout } from "@ui-kitten/components";
import { useGame, useSettings } from "../redux";

interface PropTypes {
  navigation: any;
}

const Game: React.FC<PropTypes> = ({ navigation }) => {
  const { game, saveGame } = useGame();
  const { settings } = useSettings();

  const light = !settings.app.darkMode;

  const lightColors = {
    text: "#101426",
    board: {
      border: "#101426",
      cell: {
        normal: "#FFFFFF",
        peer: "#C7E2FF",
        equal: "#94CBFF",
        conflict: "#FFA8B4",
        selected: "#FFF1C2",
        completed: "#B3FFD6"
      }
    },
    controls: {
      number_button: {
        background: "#FFFFFF",
        border: "#C5CEE0",
        progress: "#42AAFF",
        completed: "#51F0B0"
      }
    }
  };

  const darkColors = {
    text: "#FFFFFF",
    board: {
      border: "#101426",
      cell: {
        normal: "#222B45",
        peer: "#2E3A59",
        equal: "#1A2138",
        conflict: "#FF708D",
        selected: "#598BFF",
        completed: "#00B383"
      }
    },
    controls: {
      number_button: {
        background: "#101426",
        border: "#2E3A59",
        progress: "#598BFF",
        completed: "#00B383"
      }
    }
  };

  return (
    <Layout>
      <SafeAreaView style={{ height: "100%", width: "100%" }}>
        <Header
          title={strings.game.title}
          rightControls={<NewGame.Button />}
          navigation={navigation}
        />
        <Layout>
          {game.started ? (
            <Sudoku
              board={game.board}
              onChange={saveGame}
              settings={settings.sudoku}
              colors={light ? lightColors : darkColors}
            />
          ) : (
            <NewGame />
          )}
        </Layout>
      </SafeAreaView>
    </Layout>
  );
};

export default Game;
