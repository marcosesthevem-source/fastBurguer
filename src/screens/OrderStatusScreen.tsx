import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../theme';

export const OrderStatusScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.checkIcon}>✓</Text>
      </View>

      <Text style={styles.title}>Pedido confirmado!</Text>
      <Text style={styles.orderNumber}>Nº FB-123456</Text>

      <View style={styles.statusTimeline}>
        <View style={styles.statusItem}>
          <View style={[styles.statusDot, styles.dotDone]}>
            <Text style={styles.dotCheck}>✓</Text>
          </View>
          <Text style={styles.statusTextDone}>Preparando</Text>
        </View>

        <View style={styles.lineDone} />

        <View style={styles.statusItem}>
          <View style={[styles.statusDot, styles.dotDone]}>
            <Text style={styles.dotCheck}>✓</Text>
          </View>
          <Text style={styles.statusTextDone}>A caminho</Text>
        </View>

        <View style={styles.linePending} />

        <View style={styles.statusItem}>
          <View style={[styles.statusDot, styles.dotPending]} />
          <Text style={styles.statusTextPending}>Entregue</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.homeBtn}
        onPress={() => navigation.navigate('Main')}
        activeOpacity={0.8}
      >
        <Text style={styles.homeBtnText}>Voltar ao início</Text>
      </TouchableOpacity>
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
    borderRadius: 20,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  checkIcon: {
    color: theme.colors.white,
    fontSize: 40,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  orderNumber: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl,
  },
  statusTimeline: {
    width: '80%',
    marginBottom: 40,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
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
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusTextDone: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  statusTextPending: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  lineDone: {
    width: 2,
    height: 30,
    backgroundColor: theme.colors.secondary,
    marginLeft: 11,
    marginVertical: 2,
  },
  linePending: {
    width: 2,
    height: 30,
    backgroundColor: theme.colors.border,
    marginLeft: 11,
    marginVertical: 2,
  },
  homeBtn: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    width: '100%',
    alignItems: 'center',
  },
  homeBtnText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});