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
                selected: "#81D4FA",
                completed: "#00CCAF" // TODO: Add isCompleted flag for if cell is part of completed box, row, or column
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
            progress: "#3E87F6",
            completed: "#00CCAF"
        }
    }
};

export const ColorsContext = React.createContext(colors);

export default colors;
