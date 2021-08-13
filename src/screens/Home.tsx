import React from "react";
import { SafeAreaView } from "react-native";
import { Layout, Button } from "@ui-kitten/components";
import { useGame } from "../redux";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "../navigation/AppNavigator";

interface HomeProps {
  navigation: StackNavigationProp<StackParamList>;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
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
