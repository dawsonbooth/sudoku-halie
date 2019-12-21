import React from "react";
import { Button, Icon } from "native-base";
import { icons } from "../../constants";

interface PropTypes {
    onPress: () => void;
}

export default function NewGameButton({ onPress }: PropTypes) {
    return (
        <Button transparent onPress={onPress}>
            <Icon name={icons.sudoku.newGame} />
        </Button>
    );
}
