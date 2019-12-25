import React, { useContext } from "react";
import { SettingsContext } from "./settings";
import { Row } from "native-base";
import { TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NumberButton from "./NumberButton";

interface PropTypes {
    progress: number[];
    size: number;
    handleEraserButtonPress: () => void;
    handleRevealButtonPress: () => void;
    handleNumberButtonPress: () => void;
}

export default function Controls({
    progress,
    size,
    handleEraserButtonPress,
    handleRevealButtonPress,
    handleNumberButtonPress
}: PropTypes) {
    const settings = useContext(SettingsContext);

    return (
        <>
            <Row
                style={{
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    height: "auto",
                    maxWidth: size
                }}
            >
                <TouchableOpacity onPress={() => handleEraserButtonPress()}>
                    <MaterialCommunityIcons name="eraser" size={size / 10} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        Alert.alert(
                            "Reveal",
                            "Are you sure you want to reveal this cell?",
                            [
                                {
                                    text: "Cancel",
                                    style: "cancel"
                                },
                                {
                                    text: "OK",
                                    onPress: handleRevealButtonPress
                                }
                            ],
                            { cancelable: false }
                        )
                    }
                >
                    <MaterialCommunityIcons name="magnify" size={size / 10} />
                </TouchableOpacity>
            </Row>
            <Row
                style={{
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "auto",
                    maxWidth: size
                }}
            >
                {[...Array(settings.degree)].map((_, i) => {
                    const number = i + 1;
                    return (
                        <NumberButton
                            key={number}
                            number={number}
                            percent={progress[number] * 100}
                            radius={size / 15}
                            onPress={() => handleNumberButtonPress(number)}
                        />
                    );
                })}
            </Row>
        </>
    );
}
