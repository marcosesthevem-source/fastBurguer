import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../theme';
import { ProfileScreenProps, RootStackParamList, UserProfile } from '../types';

interface MenuOption {
  label: string;
  icon: string;
  onPress?: () => void;
  isDestructive?: boolean;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [user, setUser] = useState<UserProfile>({
    name: 'Cliente Fast Burguer',
    email: 'cliente@fastburguer.com',
  });

  useEffect(() => {
    async function loadUser() {
      try {
        const storedUser = await AsyncStorage.getItem('@FastBurguer:user');
        if (storedUser) {
          const parsedUser: UserProfile = JSON.parse(storedUser);
          setUser({
            name: parsedUser.name || 'Cliente Fast Burguer',
            email: parsedUser.email || 'cliente@fastburguer.com',
          });
        }
      } catch {
        // Mantém valores padrão
      }
    }
    loadUser();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Sair da conta',
      'Deseja realmente sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('@FastBurguer:user');
            } catch {
              // Erro silencioso
            }
            const rootNav = navigation.getParent<NativeStackNavigationProp<RootStackParamList>>();
            if (rootNav) {
              rootNav.reset({
                index: 0,
                routes: [{ name: 'Auth' }],
              });
            }
          },
        },
      ]
    );
  };

  const handleMenuPress = (label: string) => {
    Alert.alert(label, `A funcionalidade "${label}" estará disponível na próxima atualização.`);
  };

  const menuOptions: MenuOption[] = [
    { label: 'Meus pedidos', icon: '🛍️', onPress: () => handleMenuPress('Meus pedidos') },
    { label: 'Endereços', icon: '📍', onPress: () => handleMenuPress('Endereços') },
    { label: 'Formas de pagamento', icon: '💳', onPress: () => handleMenuPress('Formas de pagamento') },
    { label: 'Configurações', icon: '⚙️', onPress: () => handleMenuPress('Configurações') },
    { label: 'Sair', icon: '🚪', onPress: handleLogout, isDestructive: true },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>👤</Text>
      </View>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>

      <View style={styles.menuGroup}>
        {menuOptions.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuItem,
              index === menuOptions.length - 1 && styles.lastMenuItem,
            ]}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text
              style={[
                styles.menuLabel,
                item.isDestructive && styles.destructiveLabel,
              ]}
            >
              {item.label}
            </Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingTop: 60,
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.xxl,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: theme.colors.cardBackground,
    borderWidth: 2,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  avatarText: {
    fontSize: 42,
  },
  name: {
    fontSize: theme.fontSizes.xl,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  email: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl,
    marginTop: 2,
  },
  menuGroup: {
    width: '100%',
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: theme.spacing.md,
  },
  menuLabel: {
    flex: 1,
    fontSize: theme.fontSizes.md,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  destructiveLabel: {
    color: theme.colors.primary,
  },
  arrow: {
    fontSize: 22,
    color: theme.colors.textSecondary,
  },
});