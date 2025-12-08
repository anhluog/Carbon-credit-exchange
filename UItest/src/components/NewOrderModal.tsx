import { X, Search } from 'lucide-react';
import { useState } from 'react';

interface NewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SellOrder {
  id: string;
  counterparty: {
    name: string;
    avatar: string;
  };
  quantity: string;
  amount: string;
  expires: string;
}

const mockSellOrders: SellOrder[] = [
  {
    id: '1',
    counterparty: {
      name: 'Mohammed Montero',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    quantity: '1 BTC',
    amount: '28,750.00 USDC',
    expires: '05/21/2022',
  },
  {
    id: '2',
    counterparty: {
      name: 'Luis Maria Ruiz',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    quantity: '0.75 BTC',
    amount: '21,500.00 USDC',
    expires: '05/21/2022',
  },
  {
    id: '3',
    counterparty: {
      name: 'Francesc Xavier',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    quantity: '0.85 BTC',
    amount: '10,500.00 USDC',
    expires: '05/21/2022',
  },
];

export default function NewOrderModal({ isOpen, onClose }: NewOrderModalProps) {
  const [activeTab, setActiveTab] = useState<'BUY' | 'SELL'>('BUY');

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-6">
        <div className="bg-[#1a2332] border border-gray-700 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
            <h2 className="text-white text-2xl font-semibold">New Order</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex border-b border-gray-700">
            <button
              onClick={() => setActiveTab('BUY')}
              className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'BUY'
                  ? 'text-white border-b-2 border-white'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              I WANT TO BUY
            </button>
            <button
              onClick={() => setActiveTab('SELL')}
              className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'SELL'
                  ? 'text-white border-b-2 border-white'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              I WANT TO SELL
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            {activeTab === 'BUY' && (
              <div>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search orders..."
                      className="w-full bg-[#0f1419] border border-gray-700 rounded pl-10 pr-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {mockSellOrders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-[#0f1419] border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img
                            src={order.counterparty.avatar}
                            alt={order.counterparty.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="text-white font-medium text-sm">
                              {order.counterparty.name}
                            </p>
                            <p className="text-gray-500 text-xs">Expires: {order.expires}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-medium">{order.quantity}</p>
                          <p className="text-gray-400 text-sm">{order.amount}</p>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium">
                          BUY
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'SELL' && (
              <div>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search orders..."
                      className="w-full bg-[#0f1419] border border-gray-700 rounded pl-10 pr-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {mockSellOrders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-[#0f1419] border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img
                            src={order.counterparty.avatar}
                            alt={order.counterparty.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="text-white font-medium text-sm">
                              {order.counterparty.name}
                            </p>
                            <p className="text-gray-500 text-xs">Expires: {order.expires}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-medium">{order.quantity}</p>
                          <p className="text-gray-400 text-sm">{order.amount}</p>
                        </div>
                        <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium">
                          SELL
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
