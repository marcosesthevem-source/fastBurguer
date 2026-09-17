import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useCart } from '../context/CartContext';
import { theme } from '../theme';

export const CheckoutScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { cartTotal, clearCart } = useCart();
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'PIX' | 'Cartão' | 'Dinheiro'>('PIX');

  const deliveryFee = 8.90;
  const grandTotal = cartTotal + deliveryFee;

  const handleConfirmOrder = () => {
    if (!address.trim()) {
      Alert.alert('Endereço Obrigatório', 'Informe o endereço de entrega completo.');
      return;
    }
    clearCart();
    navigation.replace('OrderStatus');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Checkout</Text>

      <Text style={styles.label}>Endereço de entrega</Text>
      <TextInput
        style={styles.input}
        placeholder="Rua, número, bairro"
        placeholderTextColor={theme.colors.textSecondary}
        value={address}
        onChangeText={setAddress}
      />

      <Text style={styles.label}>Forma de pagamento</Text>
      <View style={styles.paymentOptions}>
        {(['PIX', 'Cartão', 'Dinheiro'] as const).map((method) => (
          <TouchableOpacity
            key={method}
            style={[styles.paymentBtn, paymentMethod === method && styles.paymentBtnActive]}
            onPress={() => setPaymentMethod(method)}
          >
            <Text style={[styles.paymentText, paymentMethod === method && styles.paymentTextActive]}>
              {method}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.summaryCard}>
        <View style={styles.row}>
          <Text style={styles.summaryLabel}>Itens</Text>
          <Text style={styles.summaryValue}>R$ {cartTotal.toFixed(2).replace('.', ',')}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.summaryLabel}>Entrega</Text>
          <Text style={styles.summaryValue}>R$ {deliveryFee.toFixed(2).replace('.', ',')}</Text>
        </View>
        <View style={[styles.row, { marginTop: 8 }]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>R$ {grandTotal.toFixed(2).replace('.', ',')}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirmOrder} activeOpacity={0.8}>
        <Text style={styles.confirmBtnText}>Confirmar pedido</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  input: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    fontSize: 14,
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  paymentBtn: {
    flex: 1,
    backgroundColor: theme.colors.cardBackground,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  paymentBtnActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  paymentText: {
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  paymentTextActive: {
    color: theme.colors.white,
  },
  summaryCard: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  summaryLabel: {
    color: theme.colors.textSecondary,
  },
  summaryValue: {
    fontWeight: '600',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  confirmBtn: {
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  confirmBtnText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});