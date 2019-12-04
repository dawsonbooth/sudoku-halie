import React from "react";

const colors = {
    board: {
        border: "black",
        cell: {
            background: {
                normal: "white",
                peer: "#B3E5FC",
                equal: "#4FC3F7",
                conflict: "#FFAB91",
                selected: "#81D4FA"
            },
            number: {
                prefilled: "black",
                entry: "#3D3D3D"
            }
        }
    },
    controls: {
        number_button: {
            background: "white",
            border: "darkgrey",
            progress: "#3E87F6"
        }
    }
};

export const ColorsContext = React.createContext(colors);

export default colors;
