import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "native-base";

interface PropTypes {
    number: number;
    write: Function; // TODO: Consider changing to onPress and handling press in parent
}

export default function NumberButton({ number, write }: PropTypes) { // TODO: Add size prop (radius and fontSize)
    return (
        <TouchableOpacity onPress={() => write(number)}>
            <Text>{number}</Text>
        </TouchableOpacity>
    );
}
