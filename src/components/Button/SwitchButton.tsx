import React from 'react';
import {Pressable, SafeAreaView, View, StyleSheet, Button} from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Container from '../Container/Container';

const Switch = ({
  value,
  onPress,
  style,
  duration = 400,
  trackColors = {on: '#4AAF55', off: '#fa7f7c'},
}: {
  value?: any;
  onPress?: () => void;
  style?: any;
  duration?: number;
  trackColors?: {on: string; off: string};
}) => {
  const height = useSharedValue(0);
  const width = useSharedValue(0);

  const trackAnimatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      value.value,
      [0, 1],
      [trackColors.off, trackColors.on],
    );
    const colorValue = withTiming(color, {duration});

    return {
      backgroundColor: colorValue,
      borderRadius: height.value / 2,
    };
  });

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const moveValue = interpolate(
      Number(value.value),
      [0, 1],
      [0, width.value - height.value],
    );
    const translateValue = withTiming(moveValue, {duration});

    return {
      transform: [{translateX: translateValue}],
      borderRadius: height.value / 2,
    };
  });

  return (
    <Pressable onPress={onPress}>
      <Animated.View
        onLayout={e => {
          height.value = e.nativeEvent.layout.height;
          width.value = e.nativeEvent.layout.width;
        }}
        style={[switchStyles.track, style, trackAnimatedStyle]}>
        <Animated.View
          style={[switchStyles.thumb, thumbAnimatedStyle]}></Animated.View>
      </Animated.View>
    </Pressable>
  );
};

const switchStyles = StyleSheet.create({
  track: {
    alignItems: 'flex-start',
    width: 90,
    height: 40,
    padding: 5,
  },
  thumb: {
    height: '100%',
    aspectRatio: 1,
    backgroundColor: 'white',
  },
});

export default function SwitchButton(props: {
  value: boolean;
  onChange?: (value: boolean) => void;
}) {
  const isOn = useSharedValue(props.value || false);
  const handlePress = () => {
    isOn.value = !isOn.value;
    props?.onChange?.(!isOn.value);
  };

  return <Switch value={isOn} onPress={handlePress} style={styles.switch} />;
}

const styles = StyleSheet.create({
  switch: {
    width: 90,
    height: 35,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
