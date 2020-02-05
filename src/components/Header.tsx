import React, { useEffect } from "react";
import {
  Icon,
  OverflowMenu,
  TopNavigation,
  TopNavigationAction,
  TopNavigationActionElement
} from "@ui-kitten/components";

interface PropTypes {
  title: string;
  rightControls?: TopNavigationActionElement;
  navigation: any;
}

const MenuIcon: React.FC = style => <Icon {...style} name="more-vertical" />;

const HomeIcon: React.FC = style => <Icon {...style} name="home" />;

const GameIcon: React.FC = style => <Icon {...style} name="browser" />;

const SettingsIcon: React.FC = style => <Icon {...style} name="settings" />;

const Header: React.FC<PropTypes> = ({ title, rightControls, navigation }) => {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const menuData = [
    title == "Game"
      ? {
          title: "Settings",
          icon: SettingsIcon
        }
      : {
          title: "Game",
          icon: GameIcon
        },
    {
      title: "Home",
      icon: HomeIcon
    }
  ];

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const onMenuItemSelect = (index: number) => {
    setMenuVisible(false);
    setSelectedIndex(index);
  };

  const renderMenuAction = () => (
    <OverflowMenu
      visible={menuVisible}
      data={menuData}
      onSelect={onMenuItemSelect}
      onBackdropPress={toggleMenu}
    >
      <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
    </OverflowMenu>
  );

  useEffect(() => {
    if (!menuVisible && selectedIndex !== null)
      navigation.navigate(menuData[selectedIndex].title);
  }, [menuVisible]);

  return (
    <TopNavigation
      title={title}
      alignment="center"
      leftControl={renderMenuAction()}
      rightControls={rightControls}
    />
  );
};

export default Header;
