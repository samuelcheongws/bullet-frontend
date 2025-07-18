import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { colors } from '../../styles/colors';

export const Input: React.FC<TextInputProps> = (props) => (
  <TextInput
    style={styles.input}
    placeholderTextColor={colors.muted}
    {...props}
  />
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.background,
    color: colors.text,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#000',
    fontSize: 16,
  },
}); 