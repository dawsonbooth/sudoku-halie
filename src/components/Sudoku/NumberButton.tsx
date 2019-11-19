import React from 'react';
import { TouchableOpacity, GestureResponderEvent } from 'react-native';
import { Text } from 'native-base';

interface PropTypes {
    number: number;
    write: Function; // TODO: Consider changing to onPress and handling press in parent
}

export default function NumberButton({number, write}: PropTypes) {

    return (
            <TouchableOpacity onPress={() => write(number)}>
                <Text>{number}</Text>
            </TouchableOpacity>
    );


}