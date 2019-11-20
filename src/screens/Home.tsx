import React from "react";
import { useSelector } from "react-redux";
import { Title, Container, Content } from "native-base";
import { DrawerToggle, Header, Sudoku } from "../components";
import { strings } from "../constants";

export default function Home({ navigation }) {
    const settings = useSelector((state: Redux.State) => state.settings);

    return (
        <Container>
            <Header
                left={<DrawerToggle navigation={navigation} />}
                body={<Title>{strings.HOME.TITLE}</Title>}
            />
            <Sudoku dimension={10} settings={settings.sudoku}/>
        </Container>
    );
}
