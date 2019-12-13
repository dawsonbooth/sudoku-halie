import React from "react";

const settings: Sudoku.Settings = {
    degree: 9,
    dotNotes: false,
    feedbackCorrect: true, 
    feedbackIncorrect: true // TODO: Change to (or add) showConflicts
};

export const SettingsContext = React.createContext(settings);

export default settings;
