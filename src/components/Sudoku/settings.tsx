import React from "react";

const settings: Sudoku.Settings = {
    dotNotes: false,
    feedbackCorrect: true,
    feedbackIncorrect: true
};

export const SettingsContext = React.createContext(settings);

export default settings;
