import React from 'react';
import { Header as _Header, Left, Body, Right } from 'native-base';

interface propTypes {
    left?: React.ReactNode;
    body?: React.ReactNode;
    right?: React.ReactNode;
}

export default function Header({left, body, right}: propTypes) {

    return (
        <_Header>
            <Left>{left}</Left>
            <Body>{body}</Body>
            <Right>{right}</Right>
        </_Header>
    )
}