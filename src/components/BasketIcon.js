import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NumericFormat } from 'react-number-format';
import { useSelector } from 'react-redux';

import { selectAllBasketItems, selectBasketTotal } from '../features/basketSlice';

const BasketIcon = () => {
  const items = useSelector(selectAllBasketItems);
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);
  if (items.length === 0) return null;
  return (
    <View className="absolute bottom-10 w-full z-10 ">
      <TouchableOpacity
        onPress={() => navigation.navigate('Basket')}
        className="bg-[#00CCBB] mx-5 p-4 rounded-lg flex-row items-center space-x-1"
      >
        <Text className="text-white text-lg font-extrabold bg-[#01A296] py-1 px-2">
          {items.length}
        </Text>
        <Text className="flex-1 text-white font-extrabold text-lg text-center">View Basket</Text>
        <NumericFormat
          value={basketTotal}
          thousandSeparator
          prefix="£"
          fixedDecimalScale
          decimalScale={2}
          displayType="text"
          renderText={(value) => <Text className="text-lg text-white font-extrabold">{value}</Text>}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
