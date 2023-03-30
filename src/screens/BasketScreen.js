import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
import { NumericFormat } from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';

import { urlFor } from '../../sanity';
import { removeFromBasket, selectAllBasketItems, selectBasketTotal } from '../features/basketSlice';
import { selectRestaurant } from '../features/restaurantSlice';

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectAllBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const dispatch = useDispatch();
  const [groupedItemsBasket, setGroupedItemsBasket] = useState([]);

  const groupedItems = useMemo(
    () =>
      items.reduce((results, item) => {
        (results[item.id] = results[item.id] || []).push(item);
        return results;
      }, {}),
    [items]
  );

  useEffect(() => {
    setGroupedItemsBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-sm ">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">{restaurant.title}</Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            style={{
              ...Platform.select({
                android: {
                  paddingTop: StatusBar.currentHeight,
                  top: 0,
                },
              }),
            }}
            className="rounded-full absolute top-3 right-5 text-center"
          >
            <Ionicons name="close-circle" size={50} color="#00CCBB" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-1 bg-white my-5">
          <Image
            source={require('../../assets/images/rider.jpeg')}
            className="h-14 w-14 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsBasket).map(([key, items]) => (
            <View key={key} className="flex-row items-center space-x-3 bg-white pt-2 px-5">
              <Text className="text-[#00CCBB]">{items.length} x </Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0]?.name}</Text>

              <NumericFormat
                value={items[0]?.price}
                thousandSeparator
                decimalScale={2}
                fixedDecimalScale
                prefix="£"
                displayType="text"
                renderText={(value) => <Text className="text-gray-600">{value}</Text>}
              />
              <TouchableOpacity>
                <Text
                  className="text-[#00CCBB] text-xs"
                  onPress={() => dispatch(removeFromBasket(key))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <NumericFormat
              value={basketTotal}
              thousandSeparator
              decimalScale={2}
              fixedDecimalScale
              prefix="£"
              displayType="text"
              renderText={(value) => <Text className="text-gray-400">{value}</Text>}
            />
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <NumericFormat
              value={5.99}
              thousandSeparator
              decimalScale={2}
              fixedDecimalScale
              prefix="£"
              displayType="text"
              renderText={(value) => <Text className="text-gray-400">{value}</Text>}
            />
          </View>
          <View className="flex-row justify-between">
            <Text>Order Total</Text>
            <NumericFormat
              value={basketTotal + 5.99}
              thousandSeparator
              decimalScale={2}
              fixedDecimalScale
              prefix="£"
              displayType="text"
              renderText={(value) => <Text className="font-extrabold">{value}</Text>}
            />
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('PreparingOrder')}
            className="rounded-lg bg-[#00CCBB] p-4"
          >
            <Text className="text-center text-white text-lg font-bold">Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
