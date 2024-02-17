import React, { useEffect } from 'react';
import { SafeAreaView, Image, Animated, Easing } from 'react-native';
import Style from './LoadingCSS';

import ligth from '../../assets/ligth.png';
import dark from '../../assets/dark.png';

const Loading = () => {
  const spinValue = new Animated.Value(0);

  const startLoaderAnimation = () => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  useEffect(() => {
    startLoaderAnimation();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={Style.ScreenLoading}>
      <Animated.Image
        style={{ height: 70, width: 70, transform: [{ rotate: spin }] }}
        source={dark} 
      />
    </SafeAreaView>
  );
};

export default Loading;