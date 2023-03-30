import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import * as Progress from 'react-native-progress';
import Animated, { SlideInDown, SlideInLeft, SlideInRight } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const PreparingOrderScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Delivery');
    }, 4000);
  }, []);
  return (
    <SafeAreaView className="bg-[#00CCBB] flex-1 justify-center items-center">
      <Animated.Image
        entering={SlideInRight.springify().damping(13)}
        source={require('../../assets/images/orderLoading.gif')}
        className="h-96 w-96"
      />
      <Animated.Text
        entering={SlideInDown.duration(500).easing()}
        className="text-lg my-10 text-white font-bold text-center"
      >
        Waiting for Restaurant to accept your order
      </Animated.Text>
      <Animated.View entering={SlideInLeft.duration(800).easing()}>
        <Progress.CircleSnail size={60} color="white" thickness={6} />
      </Animated.View>
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
