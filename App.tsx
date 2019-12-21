import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux";
import { Drawer } from "./src/components";
import { Game, Settings } from "./src/screens";

const navigationConfig = {
    RouteConfigs: {
        Game: {
            screen: Game
        },
        Settings: {
            screen: Settings
        }
    },
    DrawerNavigatorConfig: {}
};

export default function App() {
    return (
        <Provider store={store}>
            <Drawer {...navigationConfig} />
        </Provider>
    );
}
