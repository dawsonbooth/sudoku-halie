import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux";
import AppNavigator from "./src/navigation/AppNavigator";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { mapping, light } from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

export default function App() {
    return (
        <Provider store={store}>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider mapping={mapping} theme={light}>
                <AppNavigator />
            </ApplicationProvider>
        </Provider>
    );
}
