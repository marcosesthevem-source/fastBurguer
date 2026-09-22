import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useCart } from '../context/CartContext';
import { theme } from '../theme';
import { CheckoutScreenProps } from '../types';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { CustomHeader } from '../components/CustomHeader';

type PaymentMethod = 'PIX' | 'Cartão' | 'Dinheiro';

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ navigation }) => {
  const { cart, cartTotal, clearCart } = useCart();
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState<string | undefined>();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('PIX');

  const deliveryFee = cart.length > 0 ? 8.90 : 0;
  const grandTotal = cartTotal + deliveryFee;

  const handleConfirmOrder = () => {
    if (!address.trim()) {
      setAddressError('Informe o endereço de entrega completo (rua, número, bairro).');
      return;
    }
    if (address.trim().length < 5) {
      setAddressError('O endereço deve conter rua, número e bairro.');
      return;
    }

    // Gerar identificador dinâmico do pedido
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const orderId = `FB-${randomNum}`;

    clearCart();
    navigation.replace('OrderStatus', { orderId });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <CustomHeader
        title="Checkout"
        showBack
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.sectionHeading}>Endereço de Entrega</Text>
        <CustomInput
          placeholder="Ex: Rua das Flores, 123 - Centro"
          value={address}
          onChangeText={(text) => {
            setAddress(text);
            if (addressError) setAddressError(undefined);
          }}
          error={addressError}
        />

        <Text style={styles.sectionHeading}>Forma de Pagamento</Text>
        <View style={styles.paymentOptions}>
          {(['PIX', 'Cartão', 'Dinheiro'] as const).map((method) => {
            const isSelected = paymentMethod === method;
            const icons: Record<PaymentMethod, string> = {
              PIX: '⚡',
              Cartão: '💳',
              Dinheiro: '💵',
            };
            return (
              <TouchableOpacity
                key={method}
                style={[styles.paymentBtn, isSelected && styles.paymentBtnActive]}
                onPress={() => setPaymentMethod(method)}
                activeOpacity={0.7}
              >
                <Text style={styles.paymentIcon}>{icons[method]}</Text>
                <Text
                  style={[
                    styles.paymentText,
                    isSelected && styles.paymentTextActive,
                  ]}
                >
                  {method}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionHeading}>Resumo do Pedido</Text>
        <View style={styles.summaryCard}>
          <View style={styles.row}>
            <Text style={styles.summaryLabel}>Subtotal dos Itens</Text>
            <Text style={styles.summaryValue}>R$ {cartTotal.toFixed(2).replace('.', ',')}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.summaryLabel}>Taxa de Entrega</Text>
            <Text style={styles.summaryValue}>R$ {deliveryFee.toFixed(2).replace('.', ',')}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.summaryLabel}>Método Escolhido</Text>
            <Text style={styles.summaryValue}>{paymentMethod}</Text>
          </View>
          <View style={[styles.row, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total a Pagar</Text>
            <Text style={styles.totalValue}>R$ {grandTotal.toFixed(2).replace('.', ',')}</Text>
          </View>
        </View>

        <CustomButton
          title="Confirmar pedido"
          variant="secondary"
          onPress={handleConfirmOrder}
          style={styles.confirmBtn}
        />
      </ScrollView>
    </KeyboardAvoidingView>
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
    paddingBottom: theme.spacing.xxl,
  },
  sectionHeading: {
    fontSize: theme.fontSizes.md,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.sm,
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
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xs,
    alignItems: 'center',
    marginHorizontal: 4,
    elevation: 1,
  },
  paymentBtnActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  paymentIcon: {
    fontSize: 22,
    marginBottom: 4,
  },
  paymentText: {
    fontWeight: 'bold',
    fontSize: theme.fontSizes.sm,
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
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
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
    color: theme.colors.secondary,
  },
  confirmBtn: {
    marginTop: theme.spacing.sm,
  },
});