import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SplashScreen } from '../screens/SplashScreen';
import { AuthNavigator } from './AuthNavigator';
import { MainTabs } from './MainTabs';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';
import { CartScreen } from '../screens/CartScreen';
import { CheckoutScreen } from '../screens/CheckoutScreen';
import { OrderStatusScreen } from '../screens/OrderStatusScreen';
import { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="OrderStatus" component={OrderStatusScreen} />
    </Stack.Navigator>
  );
};