import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import { setupURLPolyfill } from 'react-native-url-polyfill';
import { Provider } from 'react-redux';

import { store } from './src/features/store';
import BasketScreen from './src/screens/BasketScreen';
import DeliveryScreen from './src/screens/DeliveryScreen';
import HomeScreen from './src/screens/HomeScreen';
import PreparingOrderScreen from './src/screens/PreparingOrderScreen';
import RestaurantScreen from './src/screens/RestaurantScreen';

if (Platform.OS !== 'web') setupURLPolyfill();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Restaurant" component={RestaurantScreen} />
          <Stack.Screen
            name="Basket"
            component={BasketScreen}
            options={{ presentation: 'modal', headerShown: false }}
          />
          <Stack.Screen
            name="PreparingOrder"
            component={PreparingOrderScreen}
            options={{ presentation: 'fullScreenModal', headerShown: false }}
          />
          <Stack.Screen
            name="Delivery"
            component={DeliveryScreen}
            options={{ presentation: 'fullScreenModal', headerShown: false }}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
