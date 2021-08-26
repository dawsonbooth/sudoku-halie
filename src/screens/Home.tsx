import React from "react";
import { Button } from "@ui-kitten/components";
import { Store, useStore } from "../state";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "../navigation/AppNavigator";
import Screen from "../components/Screen";

interface HomeProps {
  navigation: StackNavigationProp<StackParamList>;
}

const selector = (store: Store) => store.game;

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const game = useStore(selector);

  return (
    <Screen>
      <Button
        appearance="ghost"
        onPress={() => {
          if (game.started) navigation.navigate("Game");
          else navigation.navigate("NewGame");
        }}
      >
        Play Game
      </Button>
    </Screen>
  );
};

export default Home;
