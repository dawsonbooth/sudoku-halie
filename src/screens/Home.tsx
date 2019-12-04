import React from "react";
import { useSelector } from "react-redux";
import { Title, Container, Content } from "native-base";
import { DrawerToggle, Header, Sudoku } from "../components";
import { strings } from "../constants";

export default function Home({ navigation }) { // TODO: Add colors that are also in redux; separate theming page like settings
    // TODO: New game page, use redux for whether game is active and game state
    const settings = useSelector((state: Redux.State) => state.settings);

    return (
        <Container>
            <Header
                left={<DrawerToggle navigation={navigation} />}
                body={<Title>{strings.home.title}</Title>}
            />
            <Sudoku settings={settings.sudoku}/>
        </Container>
    );
}
