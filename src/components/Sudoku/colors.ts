import React from "react";

const colors = {
    board: {
        border: "black",
        cell: {
            background: {
                normal: "white",
                peer: "#82d4fa",
                equal: "#4FC3F7",
                conflict: "#FA8D82",
                selected: "#58BFEE",
                completed: "#83FBA8"
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
            border: "#BFBFBF",
            progress: "#1296D4",
            completed: "#83FBA8"
        }
    }
};

export const ColorsContext = React.createContext(colors);

export default colors;
