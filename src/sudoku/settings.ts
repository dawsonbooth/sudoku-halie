import React from "react";
import { Settings } from "./types";

const settings: Settings = {
  degree: 9,
  prefilledRatio: 0.4,
  dotNotes: false,
  showCompleted: true,
  showPeers: true,
  showEqual: true,
  showConflicts: true,
};

export const SettingsContext = React.createContext(settings);

export default settings;
