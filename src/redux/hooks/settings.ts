import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { settings as actions } from "../actions";
import { State } from "../types";

export const useSettings = () => {
  const settings = useSelector((state: State) => state.settings);

  const dispatch = useDispatch();

  const changeSettings = useCallback(
    (object, key, value) => {
      object[key] = value;
      dispatch({ type: actions.UPDATE, settings });
    },
    [dispatch]
  );

  return { settings, changeSettings };
};
