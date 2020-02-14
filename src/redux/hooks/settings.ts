import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { settings as actions } from "../actions";
import { State } from "../types";

export const useSettings = () => {
  const [settings, setSettings] = useState(
    useSelector((state: State) => state.settings)
  );
  const dispatch = useDispatch();

  const changeSettings = useCallback(
    (object, key, value) => {
      object[key] = value;
      setSettings({
        ...settings
      });
      dispatch({ type: actions.UPDATE, settings });
    },
    [dispatch, settings]
  );

  return { settings, changeSettings };
};
