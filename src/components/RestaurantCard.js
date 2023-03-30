import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { urlFor } from '../../sanity';
const RestaurantCard = ({
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
}) => {
  const navigation = useNavigation();
  return (
    // need define bg-[color] to use shadow
    <TouchableOpacity
      className="bg-white mr-3 mb-3 shadow"
      onPress={() =>
        navigation.navigate('Restaurant', {
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
      }
    >
      <Image
        source={{
          uri: urlFor(imgUrl).url(),
        }}
        className="h-36 w-64 rounded-sm"
      />

      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{title}</Text>
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
    </TouchableOpacity>
  );
};

export default RestaurantCard;
