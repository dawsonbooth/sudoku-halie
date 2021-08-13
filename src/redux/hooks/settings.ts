import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { settings as actions } from "../actions";
import { Settings, State } from "../types";

export const useSettings = (): {
  settings: Settings;
  changeSettings: (object: unknown, key: string, value: unknown) => void;
} => {
  const settings = useSelector((state: State) => state.settings);

  const dispatch = useDispatch();

  const changeSettings = useCallback(
    (object, key, value) => {
      object[key] = value;
      dispatch({ type: actions.UPDATE, settings });
    },
    [dispatch, settings]
  );

  return { settings, changeSettings };
};
