import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../styles/colors';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { TrendingUp, TrendingDown, X, Target } from 'lucide-react-native';

const DetailRow = ({ label, value, valueStyle }: { label: string; value: string; valueStyle?: any }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={[styles.detailValue, valueStyle]}>{value}</Text>
  </View>
);

export default function PositionDetailsModal({ position, visible, onClose }: { position: any, visible: boolean, onClose: () => void }) {
  if (!position) return null;
  const isProfit = (position.unrealized_pnl || 0) >= 0;
  const isLong = position.side === 'LONG';
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View style={styles.headerIconBox}>
              <Text style={styles.headerIconText}>{position.symbol.split('-')[0].slice(0, 2)}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.headerTitle}>{position.symbol}</Text>
              <Badge variant={isLong ? 'default' : 'secondary'} style={styles.badge}>
                {position.leverage}x {position.side}
              </Badge>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X color={colors.muted} size={24} />
            </TouchableOpacity>
          </View>

          <ScrollView style={{ flex: 1 }}>
            {/* PnL Summary */}
            <View style={styles.pnlBox}>
              <View style={styles.pnlRow}>
                {isProfit ? (
                  <TrendingUp color={colors.secondary} size={24} />
                ) : (
                  <TrendingDown color={colors.error} size={24} />
                )}
                <Text style={styles.pnlLabel}>Unrealized PnL</Text>
                <Text style={[styles.pnlValue, isProfit ? styles.profit : styles.loss]}>
                  {isProfit ? '+' : ''}${(position.unrealized_pnl || 0).toFixed(2)}
                </Text>
                <Text style={[styles.pnlValue, isProfit ? styles.profit : styles.loss]}>
                  {isProfit ? '+' : ''}{(position.unrealized_pnl_percent || 0).toFixed(2)}%
                </Text>
              </View>
            </View>

            {/* Details */}
            <DetailRow label="Position Size" value={position.size.toLocaleString()} />
            <DetailRow label="Entry Price" value={`$${(position.entry_price || 0).toFixed(4)}`} />
            <DetailRow label="Mark Price" value={`$${(position.mark_price || 0).toFixed(4)}`} />
            <DetailRow label="Liquidation Price" value={`$${(position.liquidation_price || 0).toFixed(4)}`} valueStyle={styles.loss} />
            <DetailRow label="Total Value" value={`$${(position.total_value || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`} />
            <DetailRow label="Margin Used" value={`$${(position.margin || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`} />
            <DetailRow label="Leverage" value={`${position.leverage || 0}x`} />

            {/* Action Button */}
            <Button style={styles.actionBtn} onPress={onClose}>
              <Target color={colors.primary} size={20} /> Manage TP/SL Orders
            </Button>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 20,
    width: '95%',
    maxWidth: 420,
    maxHeight: '90%',
    alignSelf: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerIconBox: {
    width: 48,
    height: 48,
    backgroundColor: colors.background,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerIconText: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 18,
  },
  headerTitle: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 4,
  },
  badge: {
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  closeBtn: {
    marginLeft: 8,
    padding: 4,
  },
  pnlBox: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  pnlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pnlLabel: {
    color: colors.muted,
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  pnlValue: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  profit: {
    color: colors.secondary,
  },
  loss: {
    color: colors.error,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  detailLabel: {
    color: colors.muted,
    fontSize: 14,
  },
  detailValue: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 15,
  },
  actionBtn: {
    marginTop: 24,
    backgroundColor: colors.secondary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});