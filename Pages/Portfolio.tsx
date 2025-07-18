import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Position } from '@/entities/Position';
import { colors } from '../styles/colors';
import { portfolioStyles } from '../styles/portfolio';
import PortfolioChart from '../components/portfolio/PortfolioChart';
import PositionRow from '../components/portfolio/PositionRow';
import PositionDetailsModal from '../components/portfolio/PositionDetailsModal';
import { Input } from '../components/ui/input';
import Orders from './Orders';

const TABLE_HEADERS = [
  'Symbol', 'Size', 'Unr. PnL', 'Entry', 'Mark', 'Liq.', 'Value'
];

const PLACEHOLDER_POSITIONS = [
  {
    id: 'ph1', symbol: 'BTC-PERP', size: 1.2, entry_price: 65000, mark_price: 67000, liquidation_price: 60000, total_value: 80400, margin: 5000, leverage: 20, side: 'LONG', unrealized_pnl: 2400, unrealized_pnl_percent: 48,
  },
  {
    id: 'ph2', symbol: 'ETH-PERP', size: 10, entry_price: 3500, mark_price: 3400, liquidation_price: 3000, total_value: 34000, margin: 2000, leverage: 10, side: 'SHORT', unrealized_pnl: -1000, unrealized_pnl_percent: -50,
  },
];

const COLUMN_WIDTHS = [120, 80, 100, 100, 100, 100, 120]; // Symbol, Size, Unr. PnL, Entry, Mark, Liq., Value

function PortfolioContent({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: 'portfolio' | 'orders') => void }) {
  const insets = useSafeAreaInsets();
  const [positions, setPositions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<any | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    if (activeTab === 'portfolio') loadPositions();
  }, [activeTab]);

  const loadPositions = async () => {
    setIsLoading(true);
    try {
      const data = await Position.list('-created_date');
      setPositions(data);
    } catch (error) {
      setPositions([]);
      console.error('Error loading positions:', error);
    }
    setIsLoading(false);
  };

  const filteredPositions = positions.filter(pos =>
    pos.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Use placeholder data for chart if no positions
  const chartPositions = positions.length > 0 ? positions : PLACEHOLDER_POSITIONS;

  // Render a row with all columns in order
  const renderRow = ({ item }: { item: any }) => (
    <View style={rowStyles.row}>
      <Text style={[rowStyles.cell, { width: COLUMN_WIDTHS[0], textAlign: 'left', fontWeight: 'bold' }]}>{item.symbol}</Text>
      <Text style={[rowStyles.cell, { width: COLUMN_WIDTHS[1] }]}>{item.size}</Text>
      <Text style={[
        rowStyles.cell,
        { width: COLUMN_WIDTHS[2] },
        item.unrealized_pnl > 0 ? rowStyles.profit : item.unrealized_pnl < 0 ? rowStyles.loss : null,
      ]}>
        {item.unrealized_pnl ? `${item.unrealized_pnl >= 0 ? '+' : ''}$${item.unrealized_pnl.toFixed(2)}` : '-'}
      </Text>
      <Text style={[rowStyles.cell, { width: COLUMN_WIDTHS[3] }]}>{item.entry_price ? `$${item.entry_price.toFixed(2)}` : '-'}</Text>
      <Text style={[rowStyles.cell, { width: COLUMN_WIDTHS[4] }]}>{item.mark_price ? `$${item.mark_price.toFixed(2)}` : '-'}</Text>
      <Text style={[rowStyles.cell, { width: COLUMN_WIDTHS[5] }]}>{item.liquidation_price ? `$${item.liquidation_price.toFixed(2)}` : '-'}</Text>
      <Text style={[rowStyles.cell, { width: COLUMN_WIDTHS[6] }]}>{item.total_value ? `$${item.total_value.toFixed(2)}` : '-'}</Text>
      {/* Side label (LONG/SHORT) with color */}
      <Text style={[
        rowStyles.side,
        { position: 'absolute', left: 8, top: 24 },
        item.side === 'LONG' ? rowStyles.profit : rowStyles.loss,
      ]}>
        {item.side}
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.primary, paddingTop: insets.top }}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      {activeTab === 'portfolio' ? (
        <View style={portfolioStyles.container}>
          <Text style={portfolioStyles.header}>Portfolio</Text>
          <Input
            placeholder="Search positions..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholderTextColor={colors.muted}
            style={portfolioStyles.input}
          />
          <PortfolioChart positions={chartPositions} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
              {/* Table Header Row */}
              <View style={{ flexDirection: 'row' }}>
                {TABLE_HEADERS.map((header, idx) => (
                  <Text key={header} style={[headerStyles.headerText, { width: COLUMN_WIDTHS[idx], textAlign: idx === 0 ? 'left' : 'right' }]}>{header}</Text>
                ))}
              </View>
              {isLoading ? (
                <Text style={portfolioStyles.emptyText}>Loading...</Text>
              ) : (
                <FlatList
                  data={filteredPositions}
                  keyExtractor={item => item.id}
                  renderItem={renderRow}
                  ListEmptyComponent={<Text style={portfolioStyles.emptyText}>No positions found</Text>}
                  style={[portfolioStyles.list, { minWidth: COLUMN_WIDTHS.reduce((a, b) => a + b, 0) }]}
                />
              )}
            </View>
          </ScrollView>
          <PositionDetailsModal
            position={selectedPosition}
            visible={showDetailsModal}
            onClose={() => setShowDetailsModal(false)}
          />
        </View>
      ) : (
        <Orders />
      )}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={[styles.navBtn, activeTab === 'portfolio' && styles.navBtnActive]}
          onPress={() => setActiveTab('portfolio')}
        >
          <Text style={[styles.navBtnText, activeTab === 'portfolio' ? styles.navBtnTextActive : styles.navBtnTextInactive]}>Portfolio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navBtn, activeTab === 'orders' && styles.navBtnActive]}
          onPress={() => setActiveTab('orders')}
        >
          <Text style={[styles.navBtnText, activeTab === 'orders' ? styles.navBtnTextActive : styles.navBtnTextInactive]}>Orders</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function PortfolioScreen() {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'orders'>('portfolio');
  return (
    <SafeAreaProvider>
      <PortfolioContent activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tableHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    marginTop: 8,
  },
  tableHeader: {
    flex: 1,
    color: colors.muted,
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'right',
    marginLeft: 8,
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.primary,
    paddingVertical: 8,
  },
  navBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  navBtnActive: {
    borderBottomWidth: 3,
    borderBottomColor: colors.accent,
  },
  navBtnText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  navBtnTextActive: {
    color: colors.accent,
  },
  navBtnTextInactive: {
    color: '#b0b0b0',
  },
});

const rowStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
    position: 'relative',
  },
  cell: {
    color: colors.text,
    fontSize: 14,
    textAlign: 'right',
    paddingHorizontal: 8,
    minWidth: 60,
    height: 48,
    textAlignVertical: 'center',
    includeFontPadding: false,
    flex: 0,
  },
  side: {
    fontWeight: 'bold',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 2,
    backgroundColor: 'transparent',
  },
  profit: {
    color: colors.secondary,
  },
  loss: {
    color: colors.error,
  },
});

const headerStyles = StyleSheet.create({
  headerText: {
    color: colors.muted,
    fontWeight: 'bold',
    fontSize: 13,
    minWidth: 60,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});