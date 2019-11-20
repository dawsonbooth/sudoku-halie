import React from "react";
import { Row } from "native-base";
import NumberButton from "./NumberButton";

interface PropTypes {
    dimension: number;
    progress: number[];
    size: number;
    handleNumberButtonPress: Function;
}

export default function Controls({
    dimension,
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
            {[...Array(dimension)].map((_, i) => {
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
