import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { strings } from "../../constants";
import { Slider } from "react-native";
import { Container, Content, Card, CardItem, Text, Button } from "native-base";
import NewGameButton from "./NewGameButton";
import Sudoku from "../Sudoku";

export default function NewGame() {
    const [prefilledRatio, setPrefilledRatio] = useState(0.4); // TODO: Default prefilled ratio in (sudoku) settings
    const settings = useSelector((state: Redux.State) => state.settings);

    const dispatch = useDispatch();

    const newGame = useCallback(
        () =>
            dispatch({
                type: "SET_GAME_STATE",
                game: Sudoku.Game.new(settings.sudoku.degree, prefilledRatio)
            }),
        [dispatch, prefilledRatio]
    );

    const updatePrefilledRatio = value => {
        setPrefilledRatio(value);
    };

    const difficulty =
        strings.game.newGame.difficulties[
            Math.round(
                (1 - prefilledRatio) *
                    (strings.game.newGame.difficulties.length - 1)
            )
        ];

    return (
        <Container>
            <Content padder>
                <Card>
                    <CardItem header>
                        <Text>{strings.game.newGame.title}</Text>
                    </CardItem>
                    <CardItem>
                        <Text>Difficulty: {difficulty}</Text>
                    </CardItem>
                    <CardItem>
                        <Text>
                            Prefilled Percentage:
                            {` ${Math.round(prefilledRatio * 100)}%`}
                        </Text>
                    </CardItem>
                    <CardItem>
                        <Slider
                            style={{ width: "100%" }}
                            minimumValue={0}
                            maximumValue={1}
                            value={prefilledRatio}
                            onValueChange={updatePrefilledRatio}
                        />
                    </CardItem>
                </Card>
                <Button full onPress={newGame}>
                    <Text>{strings.game.newGame.button}</Text>
                </Button>
            </Content>
        </Container>
    );
}

NewGame.Button = NewGameButton;
