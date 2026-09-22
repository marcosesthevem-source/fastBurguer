import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import { HomeScreen } from '../screens/HomeScreen';
import { ProductsScreen } from '../screens/ProductsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { theme } from '../theme';
import { MainTabParamList, MainTabsScreenProps } from '../types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabs: React.FC<MainTabsScreenProps> = ({ route }) => {
  const userName = route.params?.userName || 'Cliente';

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.cardBackground,
          borderTopColor: theme.colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{ userName }}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          tabBarLabel: 'Cardápio',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🍔</Text>,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>👤</Text>,
        }}
      />
    </Tab.Navigator>
  );
};