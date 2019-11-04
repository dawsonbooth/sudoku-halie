import React from 'react';
import { Container } from 'native-base';
import DrawerNavigator from './navigation/DrawerNavigator';

export default function AppContainer() {
    return (
        <Container>
            <DrawerNavigator />
        </Container>
    );
}
