import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { NumericFormat } from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';

import { urlFor } from '../../sanity';
import { addToBasket, removeFromBasket, selectBasketItemsWithId } from '../features/basketSlice';

const DishRow = ({ id, name, description, price, image }) => {
  const [isPressed, setIsPressed] = useState(false);
  const dispatch = useDispatch();

  const items = useSelector(selectBasketItemsWithId(id));

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };
  const removeItemFromBasket = () => {
    if (items.length <= 0) return;
    dispatch(removeFromBasket(id));
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className={`bg-white border p-4 border-gray-200 flex-row ${isPressed && 'border-b-0'}`}
      >
        <View className="flex-1 pr-2">
          <Text className="text-lg mb-1">{name}</Text>
          <Text className="text-gray-400">{description}</Text>
          <NumericFormat
            value={price}
            decimalScale={2}
            fixedDecimalScale
            thousandSeparator
            prefix="£"
            displayType="text"
            renderText={(value) => <Text className="text-gray-400 mt-2">{value}</Text>}
          />
        </View>

        <View>
          <Image
            source={{ uri: urlFor(image).url() }}
            className="h-20 w-20 bg-gray-300 p-4 border"
            style={{ borderColor: '#e5e7eb' }}
          />
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity disabled={!items.length} onPress={removeItemFromBasket}>
              <Ionicons
                name="remove-circle"
                size={40}
                color={items.length > 0 ? '#00CCBB' : 'gray'}
              />
            </TouchableOpacity>
            <Text>{items.length}</Text>
            <TouchableOpacity onPress={addItemToBasket}>
              <Ionicons name="add-circle" size={40} color="#00CCBB" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
