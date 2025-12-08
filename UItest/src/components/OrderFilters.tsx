import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { vietnamProvinces } from '../data/vietnamProvinces';

interface OrderFiltersProps {
  activeTab: 'OPEN' | 'HISTORY';
  activeFilter: 'BUY' | 'SELL';
  activeToken: string;
  onTabChange: (tab: 'OPEN' | 'HISTORY') => void;
  onFilterChange: (filter: 'BUY' | 'SELL') => void;
  onTokenChange: (token: string) => void;
  onNewOrder: () => void;
}

export default function OrderFilters({
  activeTab,
  activeFilter,
  activeToken,
  onTabChange,
  onFilterChange,
  onTokenChange,
  onNewOrder,
}: OrderFiltersProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const tokensPerPage = 10;
  const allTokens = ['ALL', ...vietnamProvinces.map(p => p.code)];
  const totalPages = Math.ceil(allTokens.length / tokensPerPage);

  const getCurrentTokens = () => {
    const start = currentPage * tokensPerPage;
    const end = start + tokensPerPage;
    return allTokens.slice(start, end);
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-3xl font-semibold mb-4">
            Open Orders
          </h1>
          <div className="flex space-x-6 border-b border-gray-800">
            <button
              onClick={() => onTabChange('OPEN')}
              className={`pb-3 px-1 text-sm font-medium transition-colors ${
                activeTab === 'OPEN'
                  ? 'text-white border-b-2 border-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              OPEN
            </button>
            <button
              onClick={() => onTabChange('HISTORY')}
              className={`pb-3 px-1 text-sm font-medium transition-colors ${
                activeTab === 'HISTORY'
                  ? 'text-white border-b-2 border-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              HISTORY
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'OPEN' && (
        <div className="flex items-center justify-between">
          <div className="flex space-x-3">
            <button
              onClick={() => {
                onFilterChange('BUY');
                setCurrentPage(0);
              }}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                activeFilter === 'BUY'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              BUY
            </button>
            <button
              onClick={() => onFilterChange('SELL')}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                activeFilter === 'SELL'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              SELL
            </button>

            {activeFilter === 'BUY' && (
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 0}
                  className="text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex space-x-2">
                  {getCurrentTokens().map((token) => (
                    <button
                      key={token}
                      onClick={() => onTokenChange(token)}
                      className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                        activeToken === token
                          ? 'bg-gray-700 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      {token}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages - 1}
                  className="text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          <button
            onClick={onNewOrder}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            NEW EXCHANGE
          </button>
        </div>
      )}
    </div>
  );
}
