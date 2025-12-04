import { Copy, ChevronLeft, ChevronRight } from 'lucide-react';
import { Order } from '../types';
import OrderStatusBadge from './OrderStatusBadge';

interface SellOrdersTableProps {
  orders: Order[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function SellOrdersTable({
  orders,
  currentPage,
  totalPages,
  onPageChange,
}: SellOrdersTableProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
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
                Counterparty
              </th>
              <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">
                Status
              </th>
              <th className="text-right px-6 py-4 text-gray-400 font-medium text-sm">
                Total
              </th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                  You have no active sell orders
                </td>
              </tr>
            ) : (
              orders.map((order) => (
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
                        onClick={() => copyToClipboard(order.orderId)}
                        className="text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
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
                    <button className="text-red-500 hover:text-red-400 text-sm font-medium">
                      CANCEL
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 flex items-center justify-between border-t border-gray-800">
        <div className="text-gray-400 text-sm">
          Rows per page:{' '}
          <select className="bg-transparent text-white border-none outline-none cursor-pointer">
            <option value="05">05</option>
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
  );
}
