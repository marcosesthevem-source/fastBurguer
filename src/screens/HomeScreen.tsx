import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { CartButton } from '../components/CartButton';
import { theme } from '../theme';
import { HomeScreenProps, UserProfile } from '../types';

export const HomeScreen: React.FC<HomeScreenProps> = ({ route, navigation }) => {
  const [userName, setUserName] = useState(route.params?.userName || 'Cliente');
  const highlights = PRODUCTS.filter((p) => p.isHighlight);

  useEffect(() => {
    async function loadUserName() {
      if (route.params?.userName) {
        setUserName(route.params.userName);
        return;
      }
      try {
        const storedUser = await AsyncStorage.getItem('@FastBurguer:user');
        if (storedUser) {
          const parsedUser: UserProfile = JSON.parse(storedUser);
          if (parsedUser.name) {
            setUserName(parsedUser.name);
          }
        }
      } catch {
        // Fallback mantém 'Cliente'
      }
    }
    loadUserName();
  }, [route.params?.userName]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{`Olá, ${userName} 👋`}</Text>
          <Text style={styles.subGreeting}>O que você quer comer hoje?</Text>
        </View>
        <CartButton onPress={() => navigation.navigate('Cart')} />
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerBadge}>OFERTA ESPECIAL</Text>
        <Text style={styles.bannerTitle}>Combos da Semana</Text>
        <Text style={styles.bannerSubtitle}>Até 30% OFF em combos selecionados</Text>
      </View>

      <Text style={styles.sectionTitle}>Destaques</Text>
      <FlatList
        data={highlights}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.highlightItem}>
            <ProductCard
              product={item}
              onPress={() => navigation.navigate('ProductDetail', { product: item })}
            />
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.menuLink}
        onPress={() => navigation.navigate('Products')}
        activeOpacity={0.8}
      >
        <Text style={styles.menuLinkText}>Ver cardápio completo ➔</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.md,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  greeting: {
    fontSize: theme.fontSizes.xxl,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  subGreeting: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  banner: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  bannerBadge: {
    color: theme.colors.background,
    fontSize: theme.fontSizes.xs,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 4,
  },
  bannerTitle: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.xl,
    fontWeight: 'bold',
  },
  bannerSubtitle: {
    color: theme.colors.background,
    fontSize: theme.fontSizes.sm,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  highlightItem: {
    width: 170,
  },
  menuLink: {
    alignItems: 'center',
    marginTop: theme.spacing.lg,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  menuLinkText: {
    color: theme.colors.primary,
    fontSize: theme.fontSizes.md,
    fontWeight: 'bold',
  },
});