import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const ordersStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.accent,
    marginBottom: 16,
  },
  input: {
    backgroundColor: colors.background,
    color: colors.text,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  list: {
    flex: 1,
  },
  emptyText: {
    color: colors.muted,
    textAlign: 'center',
    marginTop: 32,
  },
}); 