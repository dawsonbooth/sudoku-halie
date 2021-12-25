import React from 'react'
import _Slider from '@react-native-community/slider'

interface SliderProps {
  value?: number
  color?: string
  onChange?: (value: number) => void
  onComplete?: (value: number) => void
}

const Slider: React.FC<SliderProps> = ({ value = 0, color = '#3466FF', onChange, onComplete }) => {
  return (
    <_Slider
      minimumValue={0}
      maximumValue={1}
      step={0.01}
      value={value}
      minimumTrackTintColor={color}
      onValueChange={onChange}
      onSlidingComplete={onComplete}
    />
  )
}

export default Slider
