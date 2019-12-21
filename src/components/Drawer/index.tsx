import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import DrawerButton from "./DrawerButton";
import DrawerContainer from "./DrawerContainer";

export { DrawerButton as Toggle };

type p = Parameters<typeof createDrawerNavigator>;

interface PropTypes {
    RouteConfigs: p[0];
    DrawerNavigatorConfig?: p[1];
}

export default function Drawer(props: PropTypes) {
    return <DrawerContainer {...props} />;
}

Drawer.Button = DrawerButton;
