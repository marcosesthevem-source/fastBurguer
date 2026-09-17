import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../theme';

export const ProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const menuOptions = [
    { label: 'Meus pedidos', icon: '🛍️' },
    { label: 'Endereços', icon: '📍' },
    { label: 'Formas de pagamento', icon: '💳' },
    { label: 'Configurações', icon: '⚙️' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>👤</Text>
      </View>
      <Text style={styles.name}>Cliente Fast Burguer</Text>
      <Text style={styles.email}>cliente@email.com</Text>

      <View style={styles.menuGroup}>
        {menuOptions.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.replace('Auth')}>
          <Text style={styles.menuIcon}>🚪</Text>
          <Text style={styles.menuLabel}>Sair</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: 60,
    paddingHorizontal: theme.spacing.md,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  avatarText: {
    fontSize: 40,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  email: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl,
  },
  menuGroup: {
    width: '100%',
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.xs,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  },
  menuIcon: {
    fontSize: 18,
    marginRight: theme.spacing.md,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  arrow: {
    fontSize: 20,
    color: theme.colors.textSecondary,
  },
});