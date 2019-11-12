import React from 'react';
import { Container, Content } from 'native-base';

interface propTypes {
    children?: React.ReactNode;
    header?: React.ReactNode;
}

export default function Screen({ children, header }: propTypes) {
    return (
        <Container>
            {header}
            <Content>
                {children}
            </Content>
        </Container>
    );
}
