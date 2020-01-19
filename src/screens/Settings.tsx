import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { strings } from "../constants";
import {
    Layout,
    Text,
    TopNavigation,
    Toggle,
    ListItem,
    List,
    Card
} from "@ui-kitten/components";
import { SafeAreaView } from "react-navigation";

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

    const appData = ["darkMode"];

    const sudokuData = [
        "dotNotes",
        "showCompleted",
        "showPeers",
        "showEqual",
        "showConflicts"
    ];

    const renderAppItemAccessory = (style, index) => {
        const item = appData[index];

        return (
            <Toggle
                style={style}
                checked={settings.app[item]}
                onChange={value => changeSettings(settings.app, item, value)}
            />
        );
    };

    const renderSudokuItemAccessory = (style, index) => {
        const item = sudokuData[index];

        return (
            <Toggle
                style={style}
                checked={settings.sudoku[item]}
                onChange={value => changeSettings(settings.sudoku, item, value)}
            />
        );
    };

    const renderAppItem = ({ item }) => (
        <ListItem
            title={strings.settings.application[item]}
            accessory={renderAppItemAccessory}
            onPress={() =>
                changeSettings(settings.app, item, !settings.app[item])
            }
        />
    );

    const renderSudokuItem = ({ item }) => (
        <ListItem
            title={strings.settings.sudoku[item]}
            accessory={renderSudokuItemAccessory}
            onPress={() =>
                changeSettings(settings.sudoku, item, !settings.sudoku[item])
            }
        />
    );

    return (
        <SafeAreaView>
            <TopNavigation title={strings.settings.title} alignment="center" />
            <Layout>
                <Card>
                    <Text category="h6">Application</Text>
                    <List
                        data={appData}
                        renderItem={renderAppItem}
                        scrollEnabled={false}
                    />
                </Card>
                <Card>
                    <Text category="h6">Sudoku</Text>
                    <List
                        data={sudokuData}
                        renderItem={renderSudokuItem}
                        scrollEnabled={false}
                    />
                </Card>
            </Layout>
        </SafeAreaView>
    );
}
