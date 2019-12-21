import React from "react";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";

type p = Parameters<typeof createDrawerNavigator>;

interface PropTypes {
    RouteConfigs: p[0];
    DrawerNavigatorConfig?: p[1];
}

export default function DrawerContainer({
    RouteConfigs,
    DrawerNavigatorConfig
}: PropTypes) {
    const Container = createAppContainer(
        createDrawerNavigator(RouteConfigs, DrawerNavigatorConfig)
    );

    return <Container />;
}
