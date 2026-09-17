import React from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { CartButton } from '../components/CartButton';
import { theme } from '../theme';

export const HomeScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  // Pega o nome do usuário passado pela rota
  const userName = route.params?.userName || 'Cliente';
  const highlights = PRODUCTS.filter((p) => p.isHighlight);

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
          <View style={{ width: 160 }}>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  subGreeting: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  banner: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  bannerTitle: {
    color: theme.colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  bannerSubtitle: {
    color: theme.colors.background,
    fontSize: 14,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  menuLink: {
    alignItems: 'center',
    marginTop: theme.spacing.lg,
    padding: theme.spacing.sm,
  },
  menuLinkText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});