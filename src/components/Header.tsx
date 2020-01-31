import React, { useEffect } from "react";
import {
  Icon,
  OverflowMenu,
  TopNavigation,
  TopNavigationAction,
  TopNavigationActionElement
} from "@ui-kitten/components";

const BackIcon = style => <Icon {...style} name="arrow-back" />;

const MenuIcon = style => <Icon {...style} name="more-vertical" />;

const InfoIcon = style => <Icon {...style} name="info" />;

const LogoutIcon = style => <Icon {...style} name="log-out" />;

interface PropTypes {
  title: string;
  rightControls?: TopNavigationActionElement;
  navigation: any;
}

export default function Header({
  title,
  rightControls,
  navigation
}: PropTypes) {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const menuData = [
    {
      title: "Home",
      icon: InfoIcon
    },
    title == "Game"
      ? {
          title: "Settings",
          icon: LogoutIcon
        }
      : {
          title: "Game",
          icon: BackIcon
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
}
