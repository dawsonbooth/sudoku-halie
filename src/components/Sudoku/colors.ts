import React from "react";

const colors = {
    board: {
        border: "black",
        cell: {
            background: {
                normal: "white",
                prefilled: "#EAEAEA",
                peer: "#B1E4FD",
                equal: "#56C4F5",
                conflict: "#FF997E",
                selected: "#FFE499",
                completed: "#83FBA8",
            },
            number: {
                entry: "#3A3A3A"
            }
        }
    },
    controls: {
        number_button: {
            background: "white",
            border: "#A5B1B8",
            progress: "#01A3F2",
            completed: "#42D760"
        }
    }
};

export const ColorsContext = React.createContext(colors);

export default colors;
