import React from 'react';
import NativeSlider from '@react-native-community/slider';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from '../../styles/colors';

export interface SliderProps {
  value: number[];
  onValueChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
}

export const Slider: React.FC<SliderProps> = ({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
}) => {
  return (
    <View style={styles.container}>
      <NativeSlider
        style={styles.slider}
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={value[0]}
        onValueChange={(val: number) => onValueChange([val])}
        minimumTrackTintColor={colors.accent}
        maximumTrackTintColor="#ccc"
        thumbTintColor={colors.accent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  slider: {
    width: '100%',
    height: 40,
  },
});
