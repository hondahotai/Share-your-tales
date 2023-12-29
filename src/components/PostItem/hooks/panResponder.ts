import {useRef} from 'react';
import {Animated, PanResponder} from 'react-native';

export const usePanResponder = (
  isSwipeToDeleteEnabled: boolean | undefined,
) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    isSwipeToDeleteEnabled &&
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => {
          return Math.abs(gestureState.dx) > 10;
        },
        onPanResponderGrant: () => {
          pan.setOffset({
            x: pan.x._value,
            y: 0,
          });
        },
        onPanResponderMove: Animated.event([null, {dx: pan.x}], {
          useNativeDriver: false,
        }),
        onPanResponderRelease: (e, gestureState) => {
          pan.flattenOffset();
          if (gestureState.dx < -100) {
            Animated.timing(pan.x, {
              toValue: -150,
              duration: 200,
              useNativeDriver: false,
            }).start();
          } else {
            Animated.spring(pan, {
              toValue: {x: 0, y: 0},
              useNativeDriver: false,
            }).start();
          }
        },
      }),
  ).current;
  const animatedStyle = {
    transform: pan.getTranslateTransform(),
  };
  return {panResponder, pan, animatedStyle};
};
