import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export default function PositionRow({ position, onPress }: { position: any, onPress: () => void }) {
  const isProfit = (position.unrealized_pnl || 0) >= 0;
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <View style={styles.cellMain}>
        <View style={styles.symbolCol}>
          <Text style={styles.symbol}>{position.symbol}</Text>
          <Text style={[styles.side, position.side === 'LONG' ? styles.long : styles.short]}>{position.side}</Text>
        </View>
      </View>
      <Text style={styles.cell}>{position.size}</Text>
      <Text style={[styles.cell, isProfit ? styles.profit : styles.loss]}>{isProfit ? '+' : ''}${(position.unrealized_pnl || 0).toFixed(2)}</Text>
      <Text style={styles.cell}>${(position.entry_price || 0).toFixed(2)}</Text>
      <Text style={styles.cell}>${(position.mark_price || 0).toFixed(2)}</Text>
      <Text style={styles.cell}>${(position.liquidation_price || 0).toFixed(2)}</Text>
      <Text style={styles.cell}>${(position.total_value || 0).toFixed(2)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  cellMain: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  symbolCol: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  symbol: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  side: {
    fontWeight: 'bold',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 2,
  },
  long: {
    backgroundColor: colors.secondary + '33',
    color: colors.secondary,
  },
  short: {
    backgroundColor: colors.error + '33',
    color: colors.error,
  },
  cell: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
    textAlign: 'right',
    marginLeft: 8,
  },
  profit: {
    color: colors.secondary,
  },
  loss: {
    color: colors.error,
  },
});