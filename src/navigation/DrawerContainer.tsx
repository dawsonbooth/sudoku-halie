import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";

import { Home, Settings } from "../screens";

const DrawerConfig = {};

const DrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: Home
        },
        Settings: {
            screen: Settings
        }
    },
    DrawerConfig
);

export default createAppContainer(DrawerNavigator);
