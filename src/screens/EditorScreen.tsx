import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import strings from '../constants/strings.json';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import { Container, Text, Title, Content } from 'native-base';
import MenuButton from '../components/MenuButton';

export default function SettingsScreen({ navigation }) {
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
                left={<MenuButton navigation={navigation} />}
                body={<Title>{strings.EDITOR.TITLE}</Title>}
            />
            <Content>
                <TouchableOpacity onPress={increaseCount}>
                    <Text>Increase</Text>
                </TouchableOpacity>
                <Text>{count}</Text>
                <TouchableOpacity onPress={decreaseCount}>
                    <Text>Decrease</Text>
                </TouchableOpacity>
            </Content>
        </Container>
    );
}
