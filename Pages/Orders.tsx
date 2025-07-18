import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Order } from '@/entities/Order';
import { Position } from '@/entities/Position';
import { colors } from '../styles/colors';
import { ordersStyles } from '../styles/orders';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import OrderCard from '../components/orders/OrderCard';
import CreateOrderModal from '../components/orders/CreateOrderModal';

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [positions, setPositions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'TAKE_PROFIT' | 'STOP_LOSS'>('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [ordersData, positionsData] = await Promise.all([
        Order.list('-created_date'),
        Position.list('-created_date'),
      ]);
      setOrders(ordersData);
      setPositions(positionsData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setIsLoading(false);
  };

  const handleCreateOrder = async (orderData: any) => {
    try {
      await Order.create({
        position_id: 'temp_id',
        ...orderData,
        is_partial: true,
      });
      loadData();
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const handleUpdateOrder = async (orderId: string, updateData: any) => {
    try {
      await Order.update(orderId, updateData);
      loadData();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    try {
      await Order.delete(orderId);
      loadData();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const filteredOrders = orders.filter((order: any) => {
    const matchesSearch = order.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || order.order_type === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <View style={ordersStyles.container}>
      <Text style={ordersStyles.header}>Orders</Text>
      <Input
        placeholder="Search orders..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholderTextColor={colors.muted}
        style={ordersStyles.input}
      />
      <View style={styles.tabRow}>
        <Button
          variant={activeTab === 'all' ? 'default' : 'outline'}
          onPress={() => setActiveTab('all')}
          style={styles.tabBtn}
        >
          <Text style={activeTab === 'all' ? styles.tabBtnTextActive : styles.tabBtnTextInactive}>All Orders</Text>
        </Button>
        <Button
          variant={activeTab === 'TAKE_PROFIT' ? 'default' : 'outline'}
          onPress={() => setActiveTab('TAKE_PROFIT')}
          style={styles.tabBtn}
        >
          <Text style={activeTab === 'TAKE_PROFIT' ? styles.tabBtnTextActive : styles.tabBtnTextInactive}>Take Profit</Text>
        </Button>
        <Button
          variant={activeTab === 'STOP_LOSS' ? 'default' : 'outline'}
          onPress={() => setActiveTab('STOP_LOSS')}
          style={styles.tabBtn}
        >
          <Text style={activeTab === 'STOP_LOSS' ? styles.tabBtnTextActive : styles.tabBtnTextInactive}>Stop Loss</Text>
        </Button>
      </View>
      <Button onPress={() => setShowCreateModal(true)} style={styles.createBtn}>
        New Order
      </Button>
      {isLoading ? (
        <Text style={ordersStyles.emptyText}>Loading...</Text>
      ) : (
        <FlatList
          data={filteredOrders}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <OrderCard
              order={item}
              onUpdate={handleUpdateOrder}
              onDelete={handleDeleteOrder}
            />
          )}
          ListEmptyComponent={<Text style={ordersStyles.emptyText}>No orders found</Text>}
          style={ordersStyles.list}
        />
      )}
      <CreateOrderModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateOrder={handleCreateOrder}
        symbol={positions.length > 0 ? positions[0].symbol : 'BTC-PERP'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 8,
  },
  tabBtn: {
    flex: 1,
  },
  createBtn: {
    marginBottom: 12,
    backgroundColor: colors.secondary,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  tabBtnTextActive: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  tabBtnTextInactive: {
    color: '#b0b0b0',
    fontWeight: 'bold',
    fontSize: 16,
  },
});