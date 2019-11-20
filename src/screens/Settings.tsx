import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DrawerToggle, Header } from "../components";
import { strings } from "../constants";
import {
    Text,
    Title,
    Container,
    Content,
    Card,
    CardItem,
    Right,
    Switch,
    Left,
} from "native-base";

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

    return ( // TODO: Separate into components
        <Container>
            <Header
                left={<DrawerToggle navigation={navigation} />}
                body={<Title>{strings.SETTINGS.TITLE}</Title>}
            />
            <Content padder>
                <Card>
                    <CardItem header>
                        <Text>APPLICATION</Text>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text>Dark mode</Text>
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
                        <Text>SUDOKU</Text>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text>Use dots instead of numbers for notes</Text>
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
                            <Text>Show feedback on correct entry</Text>
                        </Left>
                        <Right>
                            <Switch
                                value={settings.sudoku.feedbackCorrect}
                                onValueChange={value =>
                                    changeSettings(
                                        settings.sudoku.feedbackCorrect,
                                        "correct",
                                        value
                                    )
                                }
                            />
                        </Right>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text>Show feedback on incorrect entry</Text>
                        </Left>
                        <Right>
                            <Switch
                                value={settings.sudoku.feedbackIncorrect}
                                onValueChange={value =>
                                    changeSettings(
                                        settings.sudoku.feedbackIncorrect,
                                        "incorrect",
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
