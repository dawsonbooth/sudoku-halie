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
            </Content>
        </Container>
    );
}
