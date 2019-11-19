import React from 'react';
import { createStore } from 'redux';
import { Provider as _Provider } from 'react-redux';


const initialState: State = {
    game: {
        board: Array(9).fill(0).map(() => (
            Array(9).fill(0).map(() => ({
                value: null,
                notes: Array<boolean>(10).fill(false),
                isSelected: false,
            }))
        )),
        selected: null
    },
    count: 0
}

console.log(initialState);

const reducer = (state: State = initialState, action: Action) => {
    switch (action.type) {
        case 'UPDATE_GAME':
            return {
                game: action
            }
    }
    return state;
}
export const store = createStore(reducer);
