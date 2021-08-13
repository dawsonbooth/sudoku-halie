import React from "react";
import { Colors } from "./types";

const colors: Colors = {
  text: "black",
  board: {
    border: "black",
    cell: {
      normal: "white",
      peer: "#B1E4FD",
      equal: "#56C4F5",
      conflict: "#FF997E",
      selected: "#FFE499",
      completed: "#83FBA8",
    },
  },
  controls: {
    number_button: {
      background: "white",
      border: "#A5B1B8",
      progress: "#01A3F2",
      completed: "#42D760",
    },
  },
};

export const ColorsContext = React.createContext(colors);

export default colors;
