import React from 'react';
import { View, Text } from 'native-base';
import { colors } from '../../constants';
import { TouchableOpacity } from 'react-native';
import { GestureResponderEvent } from 'react-native';

interface PropTypes {
    value?: number;
    notes?: Set<number>;
    isPrefilled?: boolean;
    isSelected?: boolean;
    isPeer?: boolean;
    isEqual?: boolean;
    hasConflict?: boolean;
    fontSize: number;
    onPress: (event: GestureResponderEvent) => void;
}

function getBackgroundColor(isSelected: boolean, isPeer: boolean, isEqual: boolean, hasConflict: boolean) {
    let backgroundColor = colors.SUDOKU.BACKGROUND.NORMAL;
    if (isSelected) backgroundColor = colors.SUDOKU.BACKGROUND.SELECTED;
    else if (isPeer) backgroundColor = colors.SUDOKU.BACKGROUND.PEER;
    if (isEqual) backgroundColor = colors.SUDOKU.BACKGROUND.EQUAL;
    if (hasConflict) backgroundColor = colors.SUDOKU.BACKGROUND.CONFLICT;

    return backgroundColor;
}

export default function Cell({ value, notes, isPrefilled, isSelected, isPeer, isEqual, hasConflict, fontSize, onPress }: PropTypes) {
    const backgroundColor = getBackgroundColor(isSelected, isPeer, isEqual, hasConflict);

    return (
        <TouchableOpacity onPress={onPress} style={{flex: 1}}>
            <View style={{ flex: 1, backgroundColor, borderWidth: 1, borderColor: colors.SUDOKU.BORDER, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize }}>{value}</Text>
            </View>
        </TouchableOpacity>
    )
}