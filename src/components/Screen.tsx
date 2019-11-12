import React from 'react';
import { Container, Content } from 'native-base';

interface PropTypes {
    children?: React.ReactNode;
    header?: React.ReactNode;
}

export default function Screen({ children, header }: PropTypes) {
    return (
        <Container>
            {header}
            <Content>
                {children}
            </Content>
        </Container>
    );
}
