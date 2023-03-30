import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Progress from 'react-native-progress';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import { selectRestaurant } from '../features/restaurantSlice';

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const insets = useSafeAreaInsets();
  return (
    <View className="bg-[#00CCBB] flex-1">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between items-center p-5">
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="font-light text-white text-lg">Order Help</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-lg text-gray-400">Estimated Arrival</Text>
              <Text className="text-4xl font-bold">45-55 Minutes</Text>
            </View>
            <Image source={require('../../assets/images/bicycle.gif')} className="h-20 w-20" />
          </View>
          <Progress.Bar indeterminate color="#00CCBB" />
          <Text className="mt-3 text-gray-500">
            Your order at {restaurant.title} is being prepared
          </Text>
        </View>
      </SafeAreaView>

      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 -mt-16 z-0"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="#00CCBB"
        />
      </MapView>
      <View
        style={{ paddingBottom: insets.bottom }}
        className="bg-white flex-row items-center space-x-5 h-28"
      >
        <Image
          source={require('../../assets/images/rider.jpeg')}
          className="h-20 w-20 bg-gray-300 p-4 rounded-full ml-5"
        />
        <View className="flex-1">
          <Text className="text-lg">Nguyen Thanh Ha</Text>
          <Text className="text-gray-400"> Your shipper</Text>
        </View>
        <TouchableOpacity>
          <Text className="text-[#00CCBB] text-lg mr-5 font-bold">Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeliveryScreen;
