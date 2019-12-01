import React from "react";
import { Row } from "native-base";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NumberButton from "./NumberButton";

interface PropTypes {
    degree: number;
    progress: number[];
    size: number;
    handleEraserButtonPress: Function;
    handleNumberButtonPress: Function;
}

export default function Controls({
    degree,
    progress,
    size,
    handleEraserButtonPress,
    handleNumberButtonPress
}: PropTypes) {
    return (
        <>
            <Row style={{ alignItems: "center", height: "auto" }}>
                <TouchableOpacity onPress={() => handleEraserButtonPress()}>
                    <MaterialCommunityIcons name="eraser" size={size / 15} />
                </TouchableOpacity>
            </Row>
            <Row
                style={{
                    flexWrap: "wrap",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    height: "auto",
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
        </>
    );
}
