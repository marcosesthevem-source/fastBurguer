import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useCart } from '../context/CartContext';
import { theme } from '../theme';
import { ProductDetailScreenProps } from '../types';
import { CustomButton } from '../components/CustomButton';
import { CustomHeader } from '../components/CustomHeader';

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ route, navigation }) => {
  const { product } = route.params;
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      <CustomHeader showBack onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />

        <View style={styles.categoryBadge}>
          <Text style={styles.categoryBadgeText}>
            {product.category.toUpperCase()}
          </Text>
        </View>

        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>R$ {product.price.toFixed(2).replace('.', ',')}</Text>
      </ScrollView>

      <View style={styles.footer}>
        <CustomButton
          title="Adicionar ao carrinho"
          onPress={handleAddToCart}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: theme.spacing.md,
  },
  content: {
    padding: theme.spacing.md,
  },
  image: {
    width: '100%',
    height: 260,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.border,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.sm,
  },
  categoryBadgeText: {
    fontSize: theme.fontSizes.xs,
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
  },
  title: {
    fontSize: theme.fontSizes.hero,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  description: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
    lineHeight: 22,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  footer: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.cardBackground,
    borderTopWidth: 1,
    borderColor: theme.colors.border,
  },
  button: {
    width: '100%',
  },
});