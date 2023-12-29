import {useState} from 'react';
import {Animated, Dimensions} from 'react-native';

export const useSidebar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const sidebarPosition = useState(new Animated.Value(-288))[0];
  const [overlayOpacity] = useState(new Animated.Value(0));

  const toggleSidebar = () => {
    if (sidebarVisible) {
      Animated.parallel([
        Animated.timing(sidebarPosition, {
          toValue: -288,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 1,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(sidebarPosition, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: Dimensions.get('window').width - 288,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
    setSidebarVisible(!sidebarVisible);
  };
  return {
    sidebarVisible,
    setSidebarVisible,
    sidebarPosition,
    overlayOpacity,
    toggleSidebar,
  };
};
