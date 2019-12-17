import React from "react";

const colors = {
    board: {
        border: "black",
        cell: {
            background: {
                normal: "white",
                peer: "#B1E4FD",
                equal: "#A2ABF8",
                conflict: "#FF997E",
                selected: "#FFE499",
                completed: "#83FBA8"
            },
            number: {
                prefilled: "black",
                entry: "#222222"
            }
        }
    },
    controls: {
        number_button: {
            background: "white",
            border: "#A5B1B8",
            progress: "#01A3F2",
            completed: "#83FBA8"
        }
    }
};

export const ColorsContext = React.createContext(colors);

export default colors;
