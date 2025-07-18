import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../styles/colors';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', style, textStyle }) => {
  const variantStyles = {
    default: {
      backgroundColor: colors.secondary,
      borderColor: colors.secondary,
      color: colors.primary,
    },
    secondary: {
      backgroundColor: colors.background,
      borderColor: colors.accent,
      color: colors.accent,
    },
  };
  return (
    <View style={[styles.badge, { backgroundColor: variantStyles[variant].backgroundColor, borderColor: variantStyles[variant].borderColor }, style]}>
      <Text style={[styles.text, { color: variantStyles[variant].color }, textStyle]}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    alignSelf: 'flex-start',
    marginVertical: 2,
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
  },
}); 