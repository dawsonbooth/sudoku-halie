import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import { Editor, Settings } from '../screens';

const DrawerConfig = {
}

const DrawerNavigator = createDrawerNavigator({
    Editor: {
        screen: Editor
    },
    Settings: {
        screen: Settings
    }
}, DrawerConfig)

export default createAppContainer(DrawerNavigator);
