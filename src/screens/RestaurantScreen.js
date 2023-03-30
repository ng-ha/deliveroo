import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

import { urlFor } from '../../sanity';
import BasketIcon from '../components/BasketIcon';
import DishRow from '../components/DishRow';
import { setRestaurant } from '../features/restaurantSlice';

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const {
    params: { id, imgUrl, title, rating, genre, address, short_description, dishes, long, lat },
  } = useRoute();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
      })
    );
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  return (
    <>
      <BasketIcon />
      <ScrollView>
        <View>
          <Image source={{ uri: urlFor(imgUrl).url() }} className="h-56 w-full bg-gray-300 p-4" />
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
          >
            <Ionicons name="arrow-back-outline" size={20} color="#00CCBB" />
          </TouchableOpacity>
        </View>

        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold">{title}</Text>

            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <Ionicons name="star" size={22} color="green" opacity={0.5} />
                <Text className="text-gray-500 text-xs">
                  <Text className="text-green-500">{rating}</Text> · {genre}
                </Text>
              </View>

              <View className="flex-row items-center space-x-1">
                <Ionicons name="location-sharp" size={22} color="gray" opacity={0.4} />
                <Text className="text-xs text-gray-500"> Nearby · {address}</Text>
              </View>
            </View>

            <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
          </View>

          <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
            <Ionicons name="help-circle-outline" size={20} opacity={0.6} color="gray" />
            <Text className="pl-2 flex-1 text-md font-bold">Have a food allergy?</Text>
            <Ionicons name="chevron-forward" size={20} color="#00CCBB" />
          </TouchableOpacity>
        </View>

        <View className="pb-36">
          <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>

          {/* Dish rows */}
          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
