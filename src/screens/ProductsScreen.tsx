import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { CategoryPill } from '../components/CategoryPill';
import { CartButton } from '../components/CartButton';
import { Category } from '../types';
import { theme } from '../theme';

const categories: { label: string; value: Category | 'todos' }[] = [
  { label: 'Todos', value: 'todos' },
  { label: 'Burgers', value: 'burgers' },
  { label: 'Acompanhamentos', value: 'acompanhamentos' },
  { label: 'Bebidas', value: 'bebidas' },
  { label: 'Sobremesas', value: 'sobremesas' },
];

export const ProductsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'todos'>('todos');

  const filteredProducts =
    selectedCategory === 'todos'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cardápio</Text>
        <CartButton onPress={() => navigation.navigate('Cart')} />
      </View>

      <View style={styles.pillsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((cat) => (
            <CategoryPill
              key={cat.value}
              label={cat.label}
              isActive={selectedCategory === cat.value}
              onPress={() => setSelectedCategory(cat.value)}
            />
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: theme.spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  pillsContainer: {
    marginBottom: theme.spacing.md,
    paddingLeft: theme.spacing.md,
  },
  list: {
    paddingHorizontal: theme.spacing.xs,
    paddingBottom: theme.spacing.xl,
  },
});