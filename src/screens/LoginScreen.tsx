import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../theme';
import { CustomButton } from '../components/CustomButton';
import { CustomInput } from '../components/CustomInput';
import { LoginScreenProps, UserProfile } from '../types';

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    const currentErrors: { email?: string; password?: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      currentErrors.email = 'O e-mail é obrigatório.';
    } else if (trimmedEmail !== 'admin' && !emailRegex.test(trimmedEmail)) {
      currentErrors.email = 'Insira um e-mail válido (ex: cliente@email.com).';
    }

    if (!password.trim()) {
      currentErrors.password = 'A senha é obrigatória.';
    } else if (password.length < 4) {
      currentErrors.password = 'A senha deve conter pelo menos 4 caracteres.';
    }

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      const trimmedEmail = email.trim();
      const displayName =
        trimmedEmail === 'admin'
          ? 'Administrador'
          : trimmedEmail.split('@')[0].charAt(0).toUpperCase() + trimmedEmail.split('@')[0].slice(1);

      const userData: UserProfile = {
        name: displayName,
        email: trimmedEmail,
      };

      await AsyncStorage.setItem('@FastBurguer:user', JSON.stringify(userData));
      navigation.replace('Main', { userName: displayName });
    } catch {
      setErrors({ email: 'Erro ao salvar sessão. Tente novamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.emoji}>🍔</Text>
        <Text style={styles.title}>Bem-vindo de volta!</Text>
        <Text style={styles.subtitle}>Faça login para saborear o melhor burger</Text>

        <View style={styles.form}>
          <CustomInput
            label="E-mail"
            placeholder="Digite seu e-mail ou 'admin'"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) {
                setErrors((prev) => ({ ...prev, email: undefined }));
              }
            }}
            autoCapitalize="none"
            keyboardType="email-address"
            error={errors.email}
          />

          <CustomInput
            label="Senha"
            placeholder="••••••••"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errors.password) {
                setErrors((prev) => ({ ...prev, password: undefined }));
              }
            }}
            secureTextEntry
            error={errors.password}
          />

          <CustomButton
            title="Entrar"
            onPress={handleLogin}
            loading={isLoading}
            style={styles.button}
          />

          <Text style={styles.hint}>
            Dica: Utilize qualquer e-mail válido ou &quot;admin&quot; com senha &ge; 4 dígitos.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  emoji: {
    fontSize: 64,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSizes.title,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    marginTop: theme.spacing.xs,
  },
  form: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing.sm,
  },
  hint: {
    textAlign: 'center',
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.xs,
    marginTop: theme.spacing.md,
  },
});