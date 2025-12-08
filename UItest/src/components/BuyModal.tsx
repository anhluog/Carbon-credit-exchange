import { X, Calendar } from 'lucide-react';
import { useState } from 'react';

interface BuyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerateOrder?: () => void;
  isNewExchange?: boolean;
}

export default function BuyModal({ isOpen, onClose, onGenerateOrder, isNewExchange = false }: BuyModalProps) {
  const [formData, setFormData] = useState({
    counterparty: 'Luis Maria Ruiz',
    quantity: '1',
    quantityAsset: 'BTC',
    amount: '29,000.00',
    amountAsset: 'USDC',
    expires: '06/10/2022',
  });

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-6">
        <div className="bg-[#1a2332] border border-gray-700 rounded-lg w-full max-w-lg">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
            <h2 className="text-blue-500 text-2xl font-semibold">Order Counterproposal</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="px-6 py-6">
            <p className="text-gray-400 text-sm mb-6">
              Send your counter proposal order and the counterparty will respond within the estimated time.
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-xs mb-2 block">Select Counterparty</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.counterparty}
                    onChange={(e) => setFormData({ ...formData, counterparty: e.target.value })}
                    className="w-full bg-[#0f1419] border border-blue-500 rounded px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-400"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-xs mb-2 block">Quantity</label>
                  <input
                    type="text"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full bg-[#0f1419] border border-blue-500 rounded px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-xs mb-2 block">Asset</label>
                  <div className="bg-[#0f1419] border border-gray-700 rounded px-4 py-3 text-white text-sm flex items-center space-x-2">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 to-yellow-600" />
                    <span>BTC</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-xs mb-2 block">Amount</label>
                  <input
                    type="text"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full bg-[#0f1419] border border-blue-500 rounded px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-xs mb-2 block">Asset</label>
                  <div className="bg-[#0f1419] border border-gray-700 rounded px-4 py-3 text-white text-sm flex items-center space-x-2">
                    <div className="w-5 h-5 rounded-full bg-blue-500" />
                    <span>USDC</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-xs mb-2 block">This order expires in</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.expires}
                    onChange={(e) => setFormData({ ...formData, expires: e.target.value })}
                    className="w-full bg-[#0f1419] border border-blue-500 rounded px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-400"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500">
                    <Calendar className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {!isNewExchange && (
              <button
                onClick={onGenerateOrder}
                className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium"
              >
                GENERATE ORDER
              </button>
            )}
            {isNewExchange && (
              <button
                onClick={onClose}
                className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium"
              >
                SUBMIT
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
