import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { colors } from '../../styles/colors';
import { TrendingUp, TrendingDown, Edit3, Check, X } from 'lucide-react-native';

export default function OrderCard({ order, onUpdate, onDelete }: { order: any, onUpdate: (id: string, data: any) => void, onDelete: (id: string) => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    trigger_price: order.trigger_price,
    percentage: order.percentage,
    size: order.size,
  });

  const isTP = order.order_type === 'TAKE_PROFIT';
  const isProfit = order.estimated_pnl > 0;

  const handleSave = () => {
    onUpdate(order.id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      trigger_price: order.trigger_price,
      percentage: order.percentage,
      size: order.size,
    });
    setIsEditing(false);
  };

  return (
    <Card style={styles.card}>
      <CardHeader style={styles.headerRow}>
        <View style={styles.iconRow}>
          <View style={[styles.iconCircle, isTP ? styles.tpCircle : styles.slCircle]}>
            {isTP ? <TrendingUp color={colors.secondary} size={20} /> : <TrendingDown color={colors.error} size={20} />}
          </View>
          <View>
            <CardTitle style={styles.title}>{isTP ? 'Take Profit' : 'Stop Loss'}</CardTitle>
            <Text style={styles.symbol}>{order.symbol}</Text>
          </View>
        </View>
        <View style={styles.statusRow}>
          <Badge variant={order.status === 'ACTIVE' ? 'default' : 'secondary'}>
            {order.status}
          </Badge>
          <TouchableOpacity onPress={() => setIsEditing(!isEditing)} style={styles.editBtn}>
            <Edit3 color={colors.muted} size={16} />
          </TouchableOpacity>
        </View>
      </CardHeader>
      <CardContent>
        {!isEditing ? (
          <View style={styles.infoGrid}>
            <View>
              <Text style={styles.label}>Trigger Price</Text>
              <Text style={styles.value}>${order.trigger_price.toFixed(4)}</Text>
            </View>
            <View>
              <Text style={styles.label}>Size</Text>
              <Text style={styles.value}>{order.size.toLocaleString()}</Text>
            </View>
            <View style={styles.pnlBox}>
              <View style={styles.pnlRow}>
                <Text style={styles.label}>Position Close</Text>
                <Text style={styles.value}>{order.percentage}%</Text>
              </View>
              <View style={styles.pnlRow}>
                <Text style={styles.label}>Est. PnL</Text>
                <Text style={[styles.value, isProfit ? styles.profit : styles.loss]}>
                  {isProfit ? '+' : ''}${Math.abs(order.estimated_pnl).toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.editForm}>
            <Label>Trigger Price</Label>
            <Input
              keyboardType="numeric"
              value={editData.trigger_price.toString()}
              onChangeText={v => setEditData({ ...editData, trigger_price: parseFloat(v) || 0 })}
            />
            <Label>Size</Label>
            <Input
              keyboardType="numeric"
              value={editData.size.toString()}
              onChangeText={v => setEditData({ ...editData, size: parseFloat(v) || 0 })}
            />
            <Label>Position Close: {editData.percentage}%</Label>
            <Slider
              value={[editData.percentage]}
              onValueChange={v => setEditData({ ...editData, percentage: v[0] })}
              min={1}
              max={100}
              step={1}
            />
            <View style={styles.editBtnRow}>
              <Button variant="outline" onPress={handleCancel} style={styles.editBtnFlex}>
                Cancel
              </Button>
              <Button onPress={handleSave} style={styles.editBtnFlex}>
                Save
              </Button>
            </View>
          </View>
        )}
      </CardContent>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  tpCircle: {
    backgroundColor: colors.secondary + '33',
  },
  slCircle: {
    backgroundColor: colors.error + '33',
  },
  title: {
    fontSize: 16,
    color: colors.text,
  },
  symbol: {
    fontSize: 12,
    color: colors.muted,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  editBtn: {
    marginLeft: 8,
    padding: 4,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  label: {
    color: colors.muted,
    fontSize: 12,
  },
  value: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 16,
  },
  pnlBox: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
    width: '100%',
  },
  pnlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  profit: {
    color: colors.secondary,
  },
  loss: {
    color: colors.error,
  },
  editForm: {
    marginTop: 8,
  },
  editBtnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 8,
  },
  editBtnFlex: {
    flex: 1,
    marginHorizontal: 4,
  },
});