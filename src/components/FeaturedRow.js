import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import RestaurantCard from './RestaurantCard';
import client from '../../sanity';

// const img = require('../../assets/images/4.jpeg');
const FeaturedRow = ({ title, description, id }) => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    client
      .fetch(
        `
    *[_type == "featured" && _id == $id] {
      ...,
      restaurants[]->{
        ...,
        dishes[]->,
        type-> {
          name
        },
      },
    }[0]
    `,
        { id }
      )
      .then((data) => setRestaurants(data?.restaurants));
  }, [id]);
  return (
    <View className="">
      <View className="mt-4 px-4 flex-row items-center justify-between">
        <Text className="font-bold text-lg">{title}</Text>
        <Ionicons name="arrow-forward" size={33} color="#00CCBB" />
      </View>
      <Text className="text-xs text-gray-500 px-4">{description}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 16 }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            title={restaurant.name}
            rating={restaurant.rating}
            genre={restaurant.type?.name}
            address={restaurant.address}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
