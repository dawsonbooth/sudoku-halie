import React from 'react';
import { Button, Icon } from 'native-base';

export default function DrawerToggle({navigation}) {
    return (
        <Button transparent onPress={navigation.toggleDrawer}>
            <Icon name='md-menu' />
        </Button>
    )
}