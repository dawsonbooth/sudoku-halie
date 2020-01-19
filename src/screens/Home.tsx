import React, { useCallback } from "react";
import { Alert, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { NewGame, Sudoku } from "../components";
import { strings } from "../constants";
import { TopNavigation, Layout, Button } from "@ui-kitten/components";

interface PropTypes {
    navigation: any;
}

export default function Home({ navigation }: PropTypes) {
    return (
        <SafeAreaView>
            <Layout>
                <Button
                    appearance="ghost"
                    onPress={() => navigation.navigate("Game")}
                >
                    Game
                </Button>
                <Button
                    appearance="ghost"
                    onPress={() => navigation.navigate("Settings")}
                >
                    Settings
                </Button>
            </Layout>
        </SafeAreaView>
    );
}
