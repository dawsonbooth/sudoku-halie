import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { strings } from "../../constants";
import { Slider } from "react-native";
import {
    Layout,
    Toggle,
    Text,
    Button,
    ListItem,
    List
} from "@ui-kitten/components";
import NewGameButton from "./NewGameButton";

export default function NewGame() {
    const [settings, setSettings] = useState(
        useSelector((state: Redux.State) => state.settings)
    );

    const dispatch = useDispatch();

    const startGame = useCallback(() => {
        dispatch({ type: "UPDATE_SETTINGS", settings });
        dispatch({ type: "START_GAME" });
    }, [dispatch]);

    const changeSettings = (object, key, value) => {
        object[key] = value;
        setSettings({
            ...settings
        });
    };

    const difficulty =
        strings.game.newGame.difficulties[
            Math.round(
                (1 - settings.sudoku.prefilledRatio) *
                    (strings.game.newGame.difficulties.length - 1)
            )
        ];

    const data = [
        "dotNotes",
        "showCompleted",
        "showPeers",
        "showEqual",
        "showConflicts"
    ];

    const renderItemAccessory = (style, index) => {
        const item = data[index];

        return (
            <Toggle
                style={style}
                checked={settings.sudoku[item]}
                onChange={value => changeSettings(settings.sudoku, item, value)}
            />
        );
    };

    const renderItem = ({ item }) => (
        <ListItem
            title={strings.settings.sudoku[item]}
            accessory={renderItemAccessory}
            onPress={() =>
                changeSettings(settings.sudoku, item, !settings.sudoku[item])
            }
        />
    );

    return (
        <Layout>
            <Text category="h6">{`Difficulty: ${difficulty}`}</Text>
            <Text category="h6">
                Prefilled Percentage:
                {` ${Math.round(settings.sudoku.prefilledRatio * 100)}%`}
            </Text>
            <Slider
                style={{ width: "100%" }}
                minimumValue={0}
                maximumValue={1}
                value={settings.sudoku.prefilledRatio}
                onValueChange={value =>
                    changeSettings(settings.sudoku, "prefilledRatio", value)
                }
            />
            <List data={data} renderItem={renderItem} scrollEnabled={false} />
            <Button onPress={startGame}>{strings.game.newGame.button}</Button>
        </Layout>
    );
}

NewGame.Button = NewGameButton;
