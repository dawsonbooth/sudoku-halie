import _Slider from '@react-native-community/slider'
import { throttle } from 'lodash-es'
import React from 'react'

interface SliderProps {
  value?: number
  color?: string
  changesPerSecond?: number
  onChange?: (value: number) => void
  onComplete?: (value: number) => void
}

const Slider: React.FC<SliderProps> = ({
  value = 0,
  color = '#3466FF',
  changesPerSecond = 24,
  onChange,
  onComplete,
}) => {
  const onChangeThrottled = throttle(onChange, 1000 / changesPerSecond)

  return (
    <_Slider
      minimumValue={0.0}
      maximumValue={1.0}
      step={0.01}
      value={value}
      minimumTrackTintColor={color}
      onValueChange={onChangeThrottled}
      onSlidingComplete={onComplete}
    />
  )
}

export default React.memo(Slider)
