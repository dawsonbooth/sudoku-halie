import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DrawerToggle, Header, Sudoku } from '../components';
import { strings } from '../constants';
import { Text, Title, Button, Container, Content } from 'native-base';


export default function Home({ navigation }) {
    const count = useSelector((state: State) => state.count)
    const dispatch = useDispatch()

    const increaseCount = useCallback(
        () => dispatch({ type: 'INCREASE_COUNTER' }),
        [dispatch]
    )

    const decreaseCount = useCallback(
        () => dispatch({ type: 'DECREASE_COUNTER' }),
        [dispatch]
    )

    return (
        <Container>
            <Header
                left={<DrawerToggle navigation={navigation} />}
                body={<Title>{strings.HOME.TITLE}</Title>}
            />
            <Sudoku />
        </Container>
    );
}
