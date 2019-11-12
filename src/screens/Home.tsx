import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { strings } from '../constants';
import { useSelector, useDispatch } from 'react-redux';
import { DrawerToggle, Header, Screen } from '../components';
import { Text, Title } from 'native-base';


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

    const header = (<Header
        left={<DrawerToggle navigation={navigation} />}
        body={<Title>{strings.HOME.TITLE}</Title>}
    />);

    return (
        <Screen header={header}>
            <TouchableOpacity onPress={increaseCount}>
                <Text>Increase</Text>
            </TouchableOpacity>
            <Text>{count}</Text>
            <TouchableOpacity onPress={decreaseCount}>
                <Text>Decrease</Text>
            </TouchableOpacity>
        </Screen>
    );
}
