import React from "react";
import { Slider as _Slider } from "react-native";

interface PropTypes {
  value?: number;
  color?: string;
  onChange?: (value: number) => void;
  onComplete?: (value: number) => void;
}

const Slider: React.FC<PropTypes> = ({
  value = 0,
  color = "#3466FF",
  onChange,
  onComplete
}) => (
  <_Slider
    minimumValue={0}
    maximumValue={1}
    value={value}
    minimumTrackTintColor={color}
    onValueChange={onChange}
    onSlidingComplete={onComplete}
  />
);

export default Slider;
