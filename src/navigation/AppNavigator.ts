import * as screens from "../screens";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

export default createAppContainer(
    createSwitchNavigator(
        {
            Home: {
                screen: screens.Home
            },
            Game: {
                screen: screens.Game
            },
            Settings: {
                screen: screens.Settings
            }
        },
        {}
    )
);
