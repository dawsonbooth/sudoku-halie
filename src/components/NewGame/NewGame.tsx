import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { strings } from "../../constants";
import { Slider } from "react-native";
import {
    Container,
    Content,
    Card,
    CardItem,
    Text,
    Button,
    Left,
    Right,
    Switch
} from "native-base";
import NewGameButton from "./NewGameButton";

export default function NewGame() {
    const [settings, setSettings] = useState(
        useSelector((state: Redux.State) => state.settings)
    );

    const dispatch = useDispatch();

    const startGame = useCallback(() => dispatch({ type: "START_GAME" }), [
        dispatch
    ]);

    const updateSettings = useCallback(
        () => dispatch({ type: "UPDATE_SETTINGS", settings }),
        [dispatch]
    );

    const changeSettings = (object, key, value) => {
        object[key] = value;
        setSettings({
            ...settings
        });
        updateSettings();
    };

    const difficulty =
        strings.game.newGame.difficulties[
            Math.round(
                (1 - settings.sudoku.prefilledRatio) *
                    (strings.game.newGame.difficulties.length - 1)
            )
        ];

    return (
        <Container>
            <Content padder>
                <Card>
                    <CardItem header>
                        <Text>{strings.game.newGame.title}</Text>
                    </CardItem>
                    <CardItem>
                        <Text>Difficulty: {difficulty}</Text>
                    </CardItem>
                    <CardItem>
                        <Text>
                            Prefilled Percentage:
                            {` ${Math.round(
                                settings.sudoku.prefilledRatio * 100
                            )}%`}
                        </Text>
                    </CardItem>
                    <CardItem>
                        <Slider
                            style={{ width: "100%" }}
                            minimumValue={0}
                            maximumValue={1}
                            value={settings.sudoku.prefilledRatio}
                            onValueChange={value =>
                                changeSettings(
                                    settings.sudoku,
                                    "prefilledRatio",
                                    value
                                )
                            }
                        />
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text>{strings.settings.sudoku.dotNotes}</Text>
                        </Left>
                        <Right>
                            <Switch
                                value={settings.sudoku.dotNotes}
                                onValueChange={value =>
                                    changeSettings(
                                        settings.sudoku,
                                        "dotNotes",
                                        value
                                    )
                                }
                            />
                        </Right>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text>{strings.settings.sudoku.showCompleted}</Text>
                        </Left>
                        <Right>
                            <Switch
                                value={settings.sudoku.showCompleted}
                                onValueChange={value =>
                                    changeSettings(
                                        settings.sudoku,
                                        "showCompleted",
                                        value
                                    )
                                }
                            />
                        </Right>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text>{strings.settings.sudoku.showPeers}</Text>
                        </Left>
                        <Right>
                            <Switch
                                value={settings.sudoku.showPeers}
                                onValueChange={value =>
                                    changeSettings(
                                        settings.sudoku,
                                        "showPeers",
                                        value
                                    )
                                }
                            />
                        </Right>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text>{strings.settings.sudoku.showEqual}</Text>
                        </Left>
                        <Right>
                            <Switch
                                value={settings.sudoku.showEqual}
                                onValueChange={value =>
                                    changeSettings(
                                        settings.sudoku,
                                        "showEqual",
                                        value
                                    )
                                }
                            />
                        </Right>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text>{strings.settings.sudoku.showConflicts}</Text>
                        </Left>
                        <Right>
                            <Switch
                                value={settings.sudoku.showConflicts}
                                onValueChange={value =>
                                    changeSettings(
                                        settings.sudoku,
                                        "showConflicts",
                                        value
                                    )
                                }
                            />
                        </Right>
                    </CardItem>
                </Card>
                <Button full onPress={startGame}>
                    <Text>{strings.game.newGame.button}</Text>
                </Button>
            </Content>
        </Container>
    );
}

NewGame.Button = NewGameButton;
