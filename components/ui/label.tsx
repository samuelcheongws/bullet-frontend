import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { colors } from '../../styles/colors';

export interface LabelProps {
  children: React.ReactNode;
  style?: TextStyle;
}

export const Label: React.FC<LabelProps> = ({ children, style }) => (
  <Text style={[styles.label, style]}>{children}</Text>
);

const styles = StyleSheet.create({
  label: {
    color: colors.accent,
    fontWeight: '500',
    fontSize: 14,
    marginBottom: 4,
  },
}); 