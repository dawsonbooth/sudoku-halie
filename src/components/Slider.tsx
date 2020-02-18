import React from "react";
import { Slider as _Slider } from "react-native";

interface PropTypes {
  color?: string;
  onChange?: (value: number) => void;
  onComplete?: (value: number) => void;
}

const Slider: React.FC<PropTypes> = ({
  color = "#3466FF",
  onChange,
  onComplete
}) => (
  <_Slider
    minimumValue={0}
    maximumValue={1}
    minimumTrackTintColor={color}
    onValueChange={onChange}
    onSlidingComplete={onComplete}
  />
);

export default Slider;
