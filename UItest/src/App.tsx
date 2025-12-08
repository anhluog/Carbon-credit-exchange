import { useState, useMemo } from 'react';
import Navigation from './components/Navigation';
import OrderFilters from './components/OrderFilters';
import OrdersTable from './components/OrdersTable';
import HistoryOrder from './components/HistoryOrder';
import SellOrdersTable from './components/SellOrdersTable';
import BuyModal from './components/BuyModal';
import NewOrderModal from './components/NewOrderModal';
import { User, Order } from './types';
import { mockOrders, mockSellOrders } from './data/mockData';

function App() {
  const [user, setUser] = useState<User | null>({
    name: 'Luong Anh',
    avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100',
  });

  const [activeTab, setActiveTab] = useState<'OPEN' | 'HISTORY'>('OPEN');
  const [activeFilter, setActiveFilter] = useState<'BUY' | 'SELL'>('BUY');
  const [activeToken, setActiveToken] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [showNewExchangeModal, setShowNewExchangeModal] = useState(false);
  const [historyOrders, setHistoryOrders] = useState<Order[]>([]);
  const [openOrders, setOpenOrders] = useState<Order[]>(mockOrders);

  const handleDisconnect = () => {
    setUser(null);
  };

  const handleNewOrder = () => {
    setShowNewExchangeModal(true);
  };

  const handleConfirmOrder = (orderId: string) => {
    const orderToMove = openOrders.find(o => o.id === orderId);
    if (orderToMove) {
      setOpenOrders(openOrders.filter(o => o.id !== orderId));
      setHistoryOrders([orderToMove, ...historyOrders]);
    }
  };

  const filteredOrders = useMemo(() => {
    let filtered = activeFilter === 'BUY' ? openOrders : mockSellOrders;

    if (activeFilter === 'BUY') {
      if (activeToken === 'ALL') {
        return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }
      return filtered
        .filter(order => order.side === activeToken)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [activeToken, activeFilter, openOrders]);

  const historyFilteredOrders = useMemo(() => {
    return historyOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [historyOrders]);

  return (
    <div className="min-h-screen bg-[#161d26]">
      <Navigation user={user} onDisconnect={handleDisconnect} />

      <BuyModal
        isOpen={showNewExchangeModal}
        onClose={() => setShowNewExchangeModal(false)}
        isNewExchange={true}
      />

      <NewOrderModal
        isOpen={showNewOrderModal}
        onClose={() => setShowNewOrderModal(false)}
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <OrderFilters
          activeTab={activeTab}
          activeFilter={activeFilter}
          activeToken={activeToken}
          onTabChange={setActiveTab}
          onFilterChange={setActiveFilter}
          onTokenChange={setActiveToken}
          onNewOrder={handleNewOrder}
        />

        <div className="mt-6">
          {activeTab === 'OPEN' && activeFilter === 'BUY' && (
            <OrdersTable
              orders={filteredOrders}
              currentPage={currentPage}
              totalPages={Math.ceil(filteredOrders.length / 5) || 1}
              onPageChange={setCurrentPage}
              onConfirm={handleConfirmOrder}
            />
          )}
          {activeTab === 'OPEN' && activeFilter === 'SELL' && (
            <SellOrdersTable
              orders={filteredOrders}
              currentPage={currentPage}
              totalPages={Math.ceil(filteredOrders.length / 5) || 1}
              onPageChange={setCurrentPage}
            />
          )}
          {activeTab === 'HISTORY' && (
            <HistoryOrder
              orders={historyFilteredOrders}
              currentPage={currentPage}
              totalPages={Math.ceil(historyFilteredOrders.length / 5) || 1}
              onPageChange={setCurrentPage}
            />
          )}
        </div>

        <div className="mt-8 text-center text-gray-500 text-xs">
          © 2022 EXCHANGE. All Rights Reserved.
        </div>
      </main>
    </div>
  );
}

export default App;
