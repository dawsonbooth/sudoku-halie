import React from "react";
import { SafeAreaView } from "react-native";
import { Layout, Button } from "@ui-kitten/components";
import { useGame } from "../redux";

interface PropTypes {
  navigation: any;
}

const Home: React.FC<PropTypes> = ({ navigation }) => {
  const { game } = useGame();

  return (
    <Layout style={{ padding: 10 }}>
      <SafeAreaView style={{ height: "100%", width: "100%" }}>
        <Button
          appearance="ghost"
          onPress={() => {
            if (game.started) navigation.navigate("Game");
            else navigation.navigate("NewGame");
          }}
        >
          Play Game
        </Button>
      </SafeAreaView>
    </Layout>
  );
};

export default Home;
