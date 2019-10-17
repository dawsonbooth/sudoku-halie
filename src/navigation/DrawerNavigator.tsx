import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import EditorScreen from '../screens/EditorScreen';
import SettingsScreen from '../screens/SettingsScreen';

const DrawerConfig = {
}

const DrawerNavigator = createDrawerNavigator({
    Editor: {
        screen: EditorScreen
    },
    Settings: {
        screen: SettingsScreen
    }
}, DrawerConfig)

export default createAppContainer(DrawerNavigator);
