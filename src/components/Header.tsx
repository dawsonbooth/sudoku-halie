import React, { ReactElement } from "react";
import { Icon, TopNavigation } from "@ui-kitten/components";

interface PropTypes {
  title: string;
  accessoryRight?: () => ReactElement;
  navigation: any;
}

const MenuIcon: React.FC = (style) => <Icon {...style} name="more-vertical" />;

const HomeIcon: React.FC = (style) => <Icon {...style} name="home" />;

const GameIcon: React.FC = (style) => <Icon {...style} name="browser" />;

const SettingsIcon: React.FC = (style) => <Icon {...style} name="settings" />;

const Header: React.FC<PropTypes> = ({ title, accessoryRight, navigation }) => {
  //TODO

  return (
    <TopNavigation
      title={title}
      alignment="center"
      accessoryRight={accessoryRight}
    />
  );
};

export default Header;
