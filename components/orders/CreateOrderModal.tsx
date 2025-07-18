import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { colors } from '../../styles/colors';

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateOrder: (order: any) => void;
  symbol: string;
}

export default function CreateOrderModal({ isOpen, onClose, onCreateOrder, symbol }: CreateOrderModalProps) {
  const [orderType, setOrderType] = useState<'TAKE_PROFIT' | 'STOP_LOSS'>('TAKE_PROFIT');
  const [formData, setFormData] = useState({
    trigger_price: 0,
    size: 0,
    percentage: 25,
  });

  const handleSubmit = () => {
    onCreateOrder({
      symbol,
      order_type: orderType,
      ...formData,
      estimated_pnl: orderType === 'TAKE_PROFIT' ? formData.size * 0.1 : -formData.size * 0.1,
    });
    onClose();
    setFormData({ trigger_price: 0, size: 0, percentage: 25 });
  };

  return (
    <Modal visible={isOpen} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Create New Order</Text>
          <View style={styles.tabsRow}>
            <TouchableOpacity
              style={[styles.tab, orderType === 'TAKE_PROFIT' && styles.tabActive]}
              onPress={() => setOrderType('TAKE_PROFIT')}
            >
              <Text style={[styles.tabText, orderType === 'TAKE_PROFIT' && styles.tabTextActive]}>Take Profit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, orderType === 'STOP_LOSS' && styles.tabActive]}
              onPress={() => setOrderType('STOP_LOSS')}
            >
              <Text style={[styles.tabText, orderType === 'STOP_LOSS' && styles.tabTextActive]}>Stop Loss</Text>
            </TouchableOpacity>
          </View>
          <Label>Trigger Price</Label>
          <Input
            keyboardType="numeric"
            value={formData.trigger_price.toString()}
            onChangeText={v => setFormData({ ...formData, trigger_price: parseFloat(v) || 0 })}
            placeholder="Enter trigger price"
          />
          <Label>Order Size</Label>
          <Input
            keyboardType="numeric"
            value={formData.size.toString()}
            onChangeText={v => setFormData({ ...formData, size: parseFloat(v) || 0 })}
            placeholder="Enter order size"
          />
          <Label>Position Close: {formData.percentage}%</Label>
          <Slider
            value={[formData.percentage]}
            onValueChange={v => setFormData({ ...formData, percentage: v[0] })}
            min={1}
            max={100}
            step={1}
          />
          <View style={styles.buttonRow}>
            <Button variant="outline" onPress={onClose} style={styles.button}>
              Cancel
            </Button>
            <Button onPress={handleSubmit} style={styles.button}>
              Create Order
            </Button>
          </View>
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
    padding: 24,
    width: '90%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.accent,
    marginBottom: 16,
    textAlign: 'center',
  },
  tabsRow: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: colors.secondary,
  },
  tabText: {
    color: colors.text,
    fontWeight: 'bold',
  },
  tabTextActive: {
    color: colors.primary,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
});