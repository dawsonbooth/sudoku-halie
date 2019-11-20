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
import { DrawerToggle, Header } from "../components";
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
                left={<DrawerToggle navigation={navigation} />}
                body={<Title>{strings.SETTINGS.TITLE}</Title>}
            />
            <Content padder>
                <Card>
                    <CardItem header>
                        <Text>{strings.SETTINGS.APPLICATION.HEADER}</Text>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text>
                                {strings.SETTINGS.APPLICATION.DARK_MODE}
                            </Text>
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
                        <Text>{strings.SETTINGS.SUDOKU.HEADER}</Text>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text>{strings.SETTINGS.SUDOKU.DOT_NOTES}</Text>
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
                        <Text>{strings.SETTINGS.SUDOKU.FEEDBACK_CORRECT}</Text>
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
                            <Text>{strings.SETTINGS.SUDOKU.FEEDBACK_INCORRECT}</Text>
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
