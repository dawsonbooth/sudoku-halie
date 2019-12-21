import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";

import { Game, Settings } from "../screens";

const DrawerConfig = {};

const DrawerNavigator = createDrawerNavigator(
    {
        Game: {
            screen: Game
        },
        Settings: {
            screen: Settings
        }
    },
    DrawerConfig
);

export default createAppContainer(DrawerNavigator);
// TODO: Place navigation and DrawerToggle together in ../components
