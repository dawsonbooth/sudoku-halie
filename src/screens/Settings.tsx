import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Text,
    Title,
    Container,
    Content,
    Card,
    CardItem,
    Right,
    Switch,
    Left
} from "native-base";
import { Drawer, Header } from "../components";
import { strings } from "../constants";

export default function Settings({ navigation }) {
    const [settings, setSettings] = useState(
        useSelector((state: Redux.State) => state.settings)
    );
    const dispatch = useDispatch();

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

    return (
        // TODO: Separate into components
        <Container>
            <Header
                left={<Drawer.Button navigation={navigation} />}
                body={<Title>{strings.settings.title}</Title>}
            />
            <Content padder>
                <Card>
                    <CardItem header>
                        <Text>{strings.settings.application.header}</Text>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text>{strings.settings.application.darkMode}</Text>
                        </Left>
                        <Right>
                            <Switch
                                value={settings.app.darkMode}
                                onValueChange={value =>
                                    changeSettings(
                                        settings.app,
                                        "darkMode",
                                        value
                                    )
                                }
                            />
                        </Right>
                    </CardItem>
                </Card>
                <Card>
                    <CardItem header>
                        <Text>{strings.settings.sudoku.header}</Text>
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
                            <Text>
                                {strings.settings.sudoku.feedbackCorrect}
                            </Text>
                        </Left>
                        <Right>
                            <Switch
                                value={settings.sudoku.feedbackCorrect}
                                onValueChange={value =>
                                    changeSettings(
                                        settings.sudoku,
                                        "feedbackCorrect",
                                        value
                                    )
                                }
                            />
                        </Right>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text>
                                {strings.settings.sudoku.feedbackIncorrect}
                            </Text>
                        </Left>
                        <Right>
                            <Switch
                                value={settings.sudoku.feedbackIncorrect}
                                onValueChange={value =>
                                    changeSettings(
                                        settings.sudoku,
                                        "feedbackIncorrect",
                                        value
                                    )
                                }
                            />
                        </Right>
                    </CardItem>
                </Card>
            </Content>
        </Container>
    );
}
