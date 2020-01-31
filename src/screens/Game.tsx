import React from "react";
import { strings } from "../constants";
import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { NewGame, Sudoku, Header } from "../components";
import { Layout } from "@ui-kitten/components";

interface PropTypes {
  navigation: any;
}

const Game: React.FC<PropTypes> = ({ navigation }) => {
  const gameStarted = useSelector((state: Redux.State) => state.gameStarted);
  const settings = useSelector((state: Redux.State) => state.settings);
  const light = !settings.app.darkMode;

  const lightColors = {
    board: {
      border: "#101426",
      cell: {
        background: {
          normal: "#FFFFFF",
          prefilled: "#EDF1F7",
          peer: "#C7E2FF",
          equal: "#94CBFF",
          conflict: "#FFA8B4",
          selected: "#FFF1C2",
          completed: "#B3FFD6"
        },
        number: "#101426"
      }
    },
    controls: {
      number_button: {
        background: "#FFFFFF",
        border: "#C5CEE0",
        progress: "#42AAFF",
        completed: "#51F0B0",
        number: "#101426"
      }
    }
  };

  const darkColors = {
    board: {
      border: "#FFFFFF",
      cell: {
        background: {
          normal: "#101426",
          prefilled: "#1A2138",
          peer: "#0057C2",
          equal: "#0041A8",
          conflict: "#B81D5B",
          selected: "#703C00",
          completed: "#007566"
        },
        number: "#FFFFFF"
      }
    },
    controls: {
      number_button: {
        background: "#101426",
        border: "#2E3A59",
        progress: "#006FD6",
        completed: "#00B383",
        number: "#FFFFFF"
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
          {gameStarted ? (
            <Sudoku
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
