import React from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { theme } from '../theme';

interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  error,
  containerStyle,
  style,
  ...rest
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error ? styles.inputError : null, style]}
        placeholderTextColor={theme.colors.textSecondary}
        {...rest}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
    width: '100%',
  },
  label: {
    fontSize: theme.fontSizes.sm,
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
    fontSize: theme.fontSizes.md,
    color: theme.colors.textPrimary,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.fontSizes.xs,
    marginTop: theme.spacing.xs,
  },
});
