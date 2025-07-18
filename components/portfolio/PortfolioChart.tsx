
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

// Placeholder for chart. In a real app, use a React Native chart library like react-native-svg-charts.
export default function PortfolioChart({ positions }: { positions: any[] }) {
  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>Portfolio Chart</Text>
      <View style={styles.chartPlaceholder}>
        <Text style={styles.chartPlaceholderText}>[Chart Placeholder]</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    marginBottom: 16,
  },
  chartTitle: {
    color: colors.accent,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  chartPlaceholder: {
    height: 120,
    backgroundColor: colors.background,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartPlaceholderText: {
    color: colors.muted,
    fontSize: 14,
  },
});
