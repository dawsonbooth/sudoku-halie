import React, { useCallback } from "react";
import { Alert, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Title, Container, Content } from "native-base";
import { Drawer, Header, NewGame, Sudoku } from "../components";
import { strings } from "../constants";

interface PropTypes {
    navigation: any;
}

export default function Game({ navigation }: PropTypes) {
    const board = useSelector((state: Redux.State) => state.board);
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
                left={<Drawer.Button navigation={navigation} />}
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
            <Content scrollEnabled={false}>
                {board ? (
                    <Sudoku board={board} settings={settings.sudoku} />
                ) : (
                    <NewGame />
                )}
            </Content>
        </Container>
    );
}
