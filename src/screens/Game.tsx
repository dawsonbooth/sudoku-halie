import React, { useCallback } from "react";
import { Alert, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { NewGame, Sudoku } from "../components";
import { strings } from "../constants";
import { TopNavigation, Layout } from "@ui-kitten/components";

interface PropTypes {
    navigation: any;
}

export default function Game({ navigation }: PropTypes) {
    const gameStarted = useSelector((state: Redux.State) => state.gameStarted);
    const settings = useSelector((state: Redux.State) => state.settings);

    const dispatch = useDispatch();

    const endGame = useCallback(
        () =>
            dispatch({
                type: "END_GAME"
            }),
        [dispatch]
    );

    return (
        <SafeAreaView>
            <TopNavigation
                title={strings.game.title}
                alignment="center"
                rightControls={
                    <NewGame.Button
                        onPress={() =>
                            Alert.alert(
                                strings.alert.newGame.title,
                                strings.alert.newGame.message,
                                [
                                    {
                                        text: strings.alert.cancel,
                                        style: "cancel"
                                    },
                                    {
                                        text: strings.alert.ok,
                                        onPress: endGame
                                    }
                                ],
                                { cancelable: false }
                            )
                        }
                    />
                }
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
