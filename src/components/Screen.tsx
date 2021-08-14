import React, { VoidFunctionComponent } from "react";
import styled from "styled-components/native";
import { Layout } from "@ui-kitten/components";
import Header from "./Header";

const Container = styled.SafeAreaView`
  height: 100%;
  width: 100%;
`;

interface ScreenProps {
  title?: string;
  headerLeft?: VoidFunctionComponent;
  headerRight?: VoidFunctionComponent;
}

const Screen: React.FC<ScreenProps> = ({
  title,
  headerLeft,
  headerRight,
  children,
}) => {
  return (
    <Layout>
      <Container>
        <Header
          title={title}
          accessoryLeft={headerLeft as () => JSX.Element}
          accessoryRight={headerRight as () => JSX.Element}
        />
        {children}
      </Container>
    </Layout>
  );
};

export default Screen;
