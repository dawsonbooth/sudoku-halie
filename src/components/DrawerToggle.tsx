import React from 'react';
import { Button, Icon } from 'native-base';
import { icons } from '../constants';

export default function DrawerToggle({ navigation }) {
    return (
        <Button transparent onPress={navigation.toggleDrawer}>
            <Icon name={icons.DRAWER.TOGGLE} />
        </Button>
    )
}