import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { theme } from '../theme';

interface CustomHeaderProps {
  title?: string;
  onBack?: () => void;
  showBack?: boolean;
  rightComponent?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  onBack,
  showBack = false,
  rightComponent,
  style,
}) => {
  return (
    <View style={[styles.header, style]}>
      <View style={styles.leftContainer}>
        {showBack && onBack ? (
          <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
            <Text style={styles.backText}>← Voltar</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {title ? (
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      ) : null}

      <View style={styles.rightContainer}>{rightComponent}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.background,
    minHeight: 48,
  },
  leftContainer: {
    minWidth: 70,
    alignItems: 'flex-start',
  },
  backButton: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.xs,
  },
  backText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: theme.fontSizes.md,
  },
  title: {
    fontSize: theme.fontSizes.xl,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    textAlign: 'center',
    flex: 1,
  },
  rightContainer: {
    minWidth: 70,
    alignItems: 'flex-end',
  },
});
