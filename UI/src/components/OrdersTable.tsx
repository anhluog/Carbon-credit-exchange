import { useState } from 'react';
import { Copy, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Order } from '../types';
import OrderStatusBadge from './OrderStatusBadge';
import ConfirmOrderModal from './ConfirmOrderModal';

interface OrdersTableProps {
  orders: Order[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onConfirm?: (orderId: string) => void;
}

export default function OrdersTable({
  orders,
  currentPage,
  totalPages,
  onPageChange,
  onConfirm,
}: OrdersTableProps) {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const toggleExpand = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handleBuyClick = (orderId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedOrderId(orderId);
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    if (selectedOrderId && onConfirm) {
      onConfirm(selectedOrderId);
    }
    setShowConfirmModal(false);
    setSelectedOrderId(null);
  };

  return (
    <>
      <ConfirmOrderModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirm}
      />
      <div className="bg-[#0f1419] rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">
                Pair
              </th>
              <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">
                Date
              </th>
              <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">
                Order
              </th>
              <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">
                Side
              </th>
              <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">
                Counterparty
              </th>
              <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">
                Status
              </th>
              <th className="text-right px-6 py-4 text-gray-400 font-medium text-sm">
                Total
              </th>
              <th className="px-6 py-4"></th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <>
                <tr
                  key={order.id}
                  className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-2">
                        {order.pair.map((token, idx) => (
                          <div
                            key={idx}
                            className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-yellow-600 border-2 border-[#0f1419]"
                          />
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300 text-sm">
                    {order.date}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-400 text-sm font-mono">
                        {order.orderId.slice(0, 20)}...
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(order.orderId);
                        }}
                        className="text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-900/30 text-green-500 rounded text-xs font-medium">
                      {order.side}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <img
                        src={order.counterparty.avatar}
                        alt={order.counterparty.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-gray-300 text-sm">
                        {order.counterparty.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4 text-right text-white font-medium">
                    {order.total.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={(e) => handleBuyClick(order.id, e)}
                      className="px-4 py-1.5 bg-green-600 text-white rounded text-xs font-medium hover:bg-green-700 transition-colors"
                    >
                      Buy
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    {order.counterProposals && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(order.id);
                        }}
                        className="text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {expandedOrderId === order.id ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                    )}
                  </td>
                </tr>

                {expandedOrderId === order.id && order.counterProposals && (
                  <tr className="border-b border-gray-800 bg-gray-900/30">
                    <td colSpan={9} className="px-6 py-6">
                      <div className="space-y-4">
                        {order.counterProposals.map((proposal, idx) => (
                          <div key={idx} className="flex items-start gap-6 py-4 border-b border-gray-800 last:border-b-0">
                            <div className="flex items-center space-x-2 flex-shrink-0">
                              <img
                                src={proposal.avatar}
                                alt={proposal.name}
                                className="w-8 h-8 rounded-full"
                              />
                              <span className="text-gray-300 text-sm">{proposal.name}</span>
                            </div>
                            <div className="flex-1 grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500 block text-xs">Quantity</span>
                                <span className="text-gray-300">{proposal.quantity}</span>
                              </div>
                              <div>
                                <span className="text-gray-500 block text-xs">Amount</span>
                                <span className="text-gray-300">{proposal.amount}</span>
                              </div>
                              <div>
                                <span className="text-gray-500 block text-xs">Expires</span>
                                <span className="text-gray-300">{proposal.expires}</span>
                              </div>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                              <button className="px-3 py-1 text-blue-500 text-xs font-medium hover:text-blue-400">
                                ACCEPT
                              </button>
                              <button className="px-3 py-1 text-red-500 text-xs font-medium hover:text-red-400">
                                REJECT
                              </button>
                              <button className="px-3 py-1 text-gray-400 text-xs font-medium hover:text-gray-300">
                                EDIT
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 flex items-center justify-between border-t border-gray-800">
        <div className="text-gray-400 text-sm">
          Rows per page:{' '}
          <select className="bg-transparent text-white border-none outline-none cursor-pointer">
            <option value="95">95</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-400 text-sm">
            {currentPage}-{totalPages} of {totalPages}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
