import React from "react";
import { Button, Icon } from "native-base";
import { icons } from "../../constants";

export default function DrawerButton({ navigation }) {
    return (
        <Button transparent onPress={navigation.toggleDrawer}>
            <Icon name={icons.drawer.toggle} />
        </Button>
    );
}
