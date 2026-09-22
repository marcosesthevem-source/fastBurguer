import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';
import { OrderStatusScreenProps } from '../types';
import { CustomButton } from '../components/CustomButton';

export const OrderStatusScreen: React.FC<OrderStatusScreenProps> = ({ route, navigation }) => {
  const orderId = route.params?.orderId || 'FB-849201';

  const handleBackToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.checkIcon}>✓</Text>
      </View>

      <Text style={styles.title}>Pedido Confirmado!</Text>
      <Text style={styles.orderNumber}>{`Nº ${orderId}`}</Text>

      <View style={styles.statusTimeline}>
        <View style={styles.statusItem}>
          <View style={[styles.statusDot, styles.dotDone]}>
            <Text style={styles.dotCheck}>✓</Text>
          </View>
          <View>
            <Text style={styles.statusTextDone}>Preparando</Text>
            <Text style={styles.statusSubtext}>Na cozinha preparando com carinho</Text>
          </View>
        </View>

        <View style={styles.lineDone} />

        <View style={styles.statusItem}>
          <View style={[styles.statusDot, styles.dotDone]}>
            <Text style={styles.dotCheck}>✓</Text>
          </View>
          <View>
            <Text style={styles.statusTextDone}>A caminho</Text>
            <Text style={styles.statusSubtext}>Entregador a caminho da sua casa</Text>
          </View>
        </View>

        <View style={styles.linePending} />

        <View style={styles.statusItem}>
          <View style={[styles.statusDot, styles.dotPending]} />
          <View>
            <Text style={styles.statusTextPending}>Entregue</Text>
            <Text style={styles.statusSubtext}>Aguardando entrega no seu endereço</Text>
          </View>
        </View>
      </View>

      <CustomButton
        title="Voltar ao início"
        onPress={handleBackToHome}
        style={styles.homeBtn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  checkIcon: {
    color: theme.colors.white,
    fontSize: 40,
    fontWeight: 'bold',
  },
  title: {
    fontSize: theme.fontSizes.title,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  orderNumber: {
    fontSize: theme.fontSizes.md,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl,
    marginTop: theme.spacing.xs,
  },
  statusTimeline: {
    width: '90%',
    marginBottom: theme.spacing.xxl,
    backgroundColor: theme.colors.cardBackground,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  dotDone: {
    backgroundColor: theme.colors.secondary,
  },
  dotPending: {
    borderWidth: 2,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.cardBackground,
  },
  dotCheck: {
    color: theme.colors.white,
    fontSize: 13,
    fontWeight: 'bold',
  },
  statusTextDone: {
    fontSize: theme.fontSizes.md,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  statusTextPending: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.disabled,
  },
  statusSubtext: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  lineDone: {
    width: 2,
    height: 28,
    backgroundColor: theme.colors.secondary,
    marginLeft: 12,
    marginVertical: 2,
  },
  linePending: {
    width: 2,
    height: 28,
    backgroundColor: theme.colors.border,
    marginLeft: 12,
    marginVertical: 2,
  },
  homeBtn: {
    width: '100%',
  },
});