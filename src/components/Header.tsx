import React, { ReactElement } from "react";
import { Icon, TopNavigation } from "@ui-kitten/components";

interface PropTypes {
  title: string;
  accessoryLeft?: () => ReactElement;
  accessoryRight?: () => ReactElement;
}

const Header: React.FC<PropTypes> = ({
  title,
  accessoryLeft,
  accessoryRight,
}) => {
  return (
    <TopNavigation
      title={title}
      alignment="center"
      accessoryLeft={accessoryLeft}
      accessoryRight={accessoryRight}
    />
  );
};

export default Header;
