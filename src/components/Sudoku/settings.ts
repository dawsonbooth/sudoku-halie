import React from "react";

const settings: Sudoku.Settings = {
    degree: 9,
    prefilledRatio: 0.4,
    dotNotes: false,
    showCompleted: true,
    showPeers: true,
    showEqual: true,
    showConflicts: true
};

export const SettingsContext = React.createContext(settings);

export default settings;
