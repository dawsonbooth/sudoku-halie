import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DrawerToggle, Header } from '../components';
import { strings } from '../constants';
import { Text, Title, Button, Container, Content } from 'native-base';


export default function Settings({ navigation }) {
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
                body={<Title>{strings.SETTINGS.TITLE}</Title>}
            />
            <Content>
                <Button large full primary onPress={increaseCount}><Text>Increase</Text></Button>
                <Text>{count}</Text>
                <Button large full warning onPress={decreaseCount}><Text>Decrease</Text></Button>
            </Content>
        </Container>
    );
}
