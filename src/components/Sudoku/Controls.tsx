import React from "react";
import { Row } from "native-base";
import NumberButton from "./NumberButton";

interface PropTypes {
    degree: number;
    progress: number[];
    size: number;
    handleNumberButtonPress: Function;
}

export default function Controls({
    degree,
    progress,
    size,
    handleNumberButtonPress
}: PropTypes) {
    return (
        <Row
            style={{
                justifyContent: "space-evenly",
                width: size
            }}
        >
            {[...Array(degree)].map((_, i) => {
                const number = i + 1;
                return (
                    <NumberButton
                        key={number}
                        number={number}
                        percent={progress[number] * 100}
                        radius={size / 20}
                        onPress={() => handleNumberButtonPress(number)}
                    />
                );
            })}
        </Row>
    );
}
