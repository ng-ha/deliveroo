import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import client from '../../sanity';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';

const img = require('../../assets/images/rider.jpeg');

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  useEffect(() => {
    client
      .fetch(
        `
    *[_type == "featured"] {
      ...,
      restaurants[]->{
        ...,
        dishes[]->
      }
    }`
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);

  // `
  //   *[_type == "featured"] {
  //     ...,
  //     restaurants[]->{
  //       ...,
  //       dishes[]->
  //     }
  //   }`

  return (
    <SafeAreaView className="bg-white">
      <StatusBar style="auto" />
      {/* Header */}

      <View className="flex-row py-3 mx-4 space-x-2 items-center">
        <Image
          // source={{ uri: 'https://links.papareact.com/wru' }}
          source={img}
          className="h-14 w-14 bg-gray-300 p-4 rounded-full"
        />

        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now?</Text>
          <TouchableOpacity>
            <Text className="font-bold text-xl">
              Current Location
              <Ionicons name="chevron-down" size={20} color="#00CCBB" />
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Ionicons name="ios-person-outline" size={35} color="#00CCBB" />
        </TouchableOpacity>
      </View>
      {/* Search */}
      <View className="flex-row items-center space-x-2 mx-4 mb-4">
        <View className="flex-row space-x-2 bg-gray-200 p-3 flex-1">
          <Ionicons name="search" size={20} color="gray" />
          <TextInput placeholder="Restaurants and cuisines" keyboardType="default" />
        </View>
        <TouchableOpacity>
          <Ionicons name="filter" size={24} color="#00CCBB" />
        </TouchableOpacity>
      </View>

      {/* Body */}
      <ScrollView>
        {/* Categories */}
        <Categories />

        {/* Featured  */}

        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
        <View className="pb-36" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
