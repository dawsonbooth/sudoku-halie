import React, { useContext } from "react";
import { SettingsContext } from "./settings";
import { Row, Col, Grid } from "react-native-easy-grid";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NumberButton from "./NumberButton";

interface PropTypes {
    progress: number[];
    size: number;
    notesMode: boolean;
    handleNotesButtonPress: () => void;
    handleEraserButtonPress: () => void;
    handleRevealButtonPress: () => void;
    handleNumberButtonPress: (number: number) => void;
}

export default function Controls({
    progress,
    size,
    notesMode,
    handleNotesButtonPress,
    handleEraserButtonPress,
    handleRevealButtonPress,
    handleNumberButtonPress
}: PropTypes) {
    const settings = useContext(SettingsContext);

    return (
        <Grid>
            <Col
                style={{
                    alignItems: "center"
                }}
            >
                <Row
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        height: "auto",
                        maxWidth: size
                    }}
                >
                    <TouchableOpacity onPress={() => handleNotesButtonPress()}>
                        <MaterialCommunityIcons
                            name="pencil"
                            size={size / 10}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleRevealButtonPress}>
                        <MaterialCommunityIcons
                            name="magnify"
                            size={size / 10}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleEraserButtonPress()}>
                        <MaterialCommunityIcons
                            name="eraser"
                            size={size / 10}
                        />
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
                                notesMode={notesMode}
                                onPress={() => handleNumberButtonPress(number)}
                            />
                        );
                    })}
                </Row>
            </Col>
        </Grid>
    );
}
