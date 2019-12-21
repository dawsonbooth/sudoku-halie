import React, { useCallback } from "react";
import { Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Title, Container } from "native-base";
import { DrawerToggle, Header, NewGame, Sudoku } from "../components";
import { strings } from "../constants";

interface PropTypes {
    navigation: any;
}

export default function Game({ navigation }: PropTypes) {
    const game = useSelector((state: Redux.State) => state.game);
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
        <Container>
            <Header
                left={<DrawerToggle navigation={navigation} />}
                body={<Title>{strings.game.title}</Title>}
                right={
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
                    ></NewGame.Button>
                }
            />
            {game ? (
                <Sudoku savedGame={game} settings={settings.sudoku} />
            ) : (
                <NewGame />
            )}
        </Container>
    );
}
