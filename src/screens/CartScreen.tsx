import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from '../context/CartContext';
import { theme } from '../theme';
import { CartScreenProps } from '../types';
import { CustomButton } from '../components/CustomButton';
import { CustomHeader } from '../components/CustomHeader';

export const CartScreen: React.FC<CartScreenProps> = ({ navigation }) => {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();
  const deliveryFee = cart.length > 0 ? 8.90 : 0;
  const grandTotal = cartTotal + deliveryFee;

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Seu Pedido"
        showBack
        onBack={() => navigation.goBack()}
      />

      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={styles.emptyTitle}>Seu carrinho está vazio</Text>
          <Text style={styles.emptyText}>
            Adicione hambúrgueres e acompanhamentos deliciosos para fazer seu pedido!
          </Text>
          <CustomButton
            title="Explorar cardápio"
            onPress={() => navigation.navigate('Main')}
            style={styles.exploreButton}
          />
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.product.id}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image
                  source={{ uri: item.product.image }}
                  style={styles.itemImage}
                  resizeMode="cover"
                />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName} numberOfLines={1}>
                    {item.product.name}
                  </Text>
                  <Text style={styles.itemPrice}>
                    R$ {item.product.price.toFixed(2).replace('.', ',')}
                  </Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => updateQuantity(item.product.id, item.quantity - 1)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.qtyBtnText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => updateQuantity(item.product.id, item.quantity + 1)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.qtyBtnText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => removeFromCart(item.product.id)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.removeText}>🗑️</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>R$ {cartTotal.toFixed(2).replace('.', ',')}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Frete de Entrega</Text>
              <Text style={styles.summaryValue}>R$ {deliveryFee.toFixed(2).replace('.', ',')}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>R$ {grandTotal.toFixed(2).replace('.', ',')}</Text>
            </View>

            <CustomButton
              title="Finalizar pedido"
              onPress={() => navigation.navigate('Checkout')}
              style={styles.checkoutButton}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: theme.spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  emptyEmoji: {
    fontSize: 70,
    marginBottom: theme.spacing.md,
  },
  emptyTitle: {
    fontSize: theme.fontSizes.xl,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  emptyText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  exploreButton: {
    paddingHorizontal: theme.spacing.xl,
  },
  list: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.md,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  itemImage: {
    width: 68,
    height: 68,
    borderRadius: theme.borderRadius.sm,
  },
  itemDetails: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  itemName: {
    fontSize: theme.fontSizes.md,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  itemPrice: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyBtn: {
    backgroundColor: theme.colors.border,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyBtnText: {
    fontWeight: 'bold',
    fontSize: theme.fontSizes.md,
    color: theme.colors.textPrimary,
  },
  qtyText: {
    marginHorizontal: theme.spacing.sm,
    fontWeight: 'bold',
    fontSize: theme.fontSizes.md,
    color: theme.colors.textPrimary,
  },
  removeBtn: {
    padding: theme.spacing.xs,
  },
  removeText: {
    fontSize: 20,
  },
  summaryCard: {
    backgroundColor: theme.colors.cardBackground,
    padding: theme.spacing.md,
    borderTopLeftRadius: theme.borderRadius.lg,
    borderTopRightRadius: theme.borderRadius.lg,
    borderTopWidth: 1,
    borderColor: theme.colors.border,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  summaryLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.sm,
  },
  summaryValue: {
    fontWeight: '600',
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.sm,
  },
  totalRow: {
    marginTop: theme.spacing.xs,
    paddingTop: theme.spacing.xs,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  totalLabel: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  totalValue: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  checkoutButton: {
    marginTop: theme.spacing.md,
  },
});