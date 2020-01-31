import React from "react";
import { SafeAreaView } from "react-native";
import { Layout, Button } from "@ui-kitten/components";

interface PropTypes {
  navigation: any;
}

const Home: React.FC<PropTypes> = ({ navigation }) => {
  return (
    <Layout style={{ padding: 10 }}>
      <SafeAreaView style={{ height: "100%", width: "100%" }}>
        <Button appearance="ghost" onPress={() => navigation.navigate("Game")}>
          Game
        </Button>
        <Button
          appearance="ghost"
          onPress={() => navigation.navigate("Settings")}
        >
          Settings
        </Button>
      </SafeAreaView>
    </Layout>
  );
};

export default Home;
