import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../theme';
import { SplashScreenProps, UserProfile } from '../types';

export const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    let isMounted = true;

    const timer = setTimeout(async () => {
      try {
        const storedUser = await AsyncStorage.getItem('@FastBurguer:user');
        if (storedUser && isMounted) {
          const parsedUser: UserProfile = JSON.parse(storedUser);
          navigation.replace('Main', { userName: parsedUser.name || 'Cliente' });
        } else if (isMounted) {
          navigation.replace('Auth');
        }
      } catch {
        if (isMounted) {
          navigation.replace('Auth');
        }
      }
    }, 2500);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🍔</Text>
      <Text style={styles.title}>Fast Burguer</Text>
      <Text style={styles.subtitle}>O hambúrguer mais rápido da cidade</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  logo: {
    fontSize: 80,
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSizes.hero,
    fontWeight: 'bold',
    color: theme.colors.white,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.background,
    textAlign: 'center',
  },
});