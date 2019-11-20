import React from "react";
import { View } from "native-base";
import NumberButton from "./NumberButton";

interface PropTypes {
    write: Function;
}

export default function Controls({ write }: PropTypes) {
    return (
        <View style={{ flexDirection: "row" }}>
            <NumberButton number={1} write={write} />
            <NumberButton number={2} write={write} />
            <NumberButton number={3} write={write} />
            <NumberButton number={4} write={write} />
            <NumberButton number={5} write={write} />
            <NumberButton number={6} write={write} />
            <NumberButton number={7} write={write} />
            <NumberButton number={8} write={write} />
            <NumberButton number={9} write={write} />
        </View>
    );
}
