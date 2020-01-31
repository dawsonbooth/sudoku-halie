import React from "react";
import { strings } from "../constants";
import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { NewGame, Sudoku, Header } from "../components";
import { Layout } from "@ui-kitten/components";

interface PropTypes {
    navigation: any;
}

export default function Game({ navigation }: PropTypes) {
    const gameStarted = useSelector((state: Redux.State) => state.gameStarted);
    const settings = useSelector((state: Redux.State) => state.settings);

    return (
        <SafeAreaView>
            <Header
                title={strings.game.title}
                rightControls={<NewGame.Button />}
                navigation={navigation}
            />
            <Layout>
                {gameStarted ? (
                    <Sudoku settings={settings.sudoku} />
                ) : (
                    <NewGame />
                )}
            </Layout>
        </SafeAreaView>
    );
}
