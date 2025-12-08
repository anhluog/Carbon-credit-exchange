import { X } from 'lucide-react';

interface ConfirmOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmOrderModal({ isOpen, onClose, onConfirm }: ConfirmOrderModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-50"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-6">
        <div className="bg-[#1a2332] border border-gray-700 rounded-lg w-full max-w-lg">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
            <h2 className="text-blue-500 text-2xl font-semibold">Confirm Your Counterproposal</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="px-6 py-6">
            <h3 className="text-white text-lg font-medium mb-4">Order Details</h3>

            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400 text-sm">Order Type</span>
                <span className="text-white text-sm">BUY (LIMIT)</span>
              </div>

              <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400 text-sm">Counterparty</span>
                <span className="text-white text-sm">Luis Maria Ruiz</span>
              </div>

              <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400 text-sm">Price Limit</span>
                <span className="text-white text-sm">29,000.00 USDC</span>
              </div>

              <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400 text-sm">Start</span>
                <span className="text-white text-sm">05/21/2022 19:16:01</span>
              </div>

              <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400 text-sm">Expires</span>
                <span className="text-white text-sm">24 Hours</span>
              </div>

              <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400 text-sm">Rate Currency</span>
                <span className="text-white text-sm">USDC</span>
              </div>

              <div className="flex justify-between py-2">
                <span className="text-gray-400 text-sm">BTC To Receive</span>
                <span className="text-white text-sm">1 BTC</span>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-blue-500 text-blue-500 rounded hover:bg-blue-500/10 transition-colors font-medium"
              >
                CANCEL
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium"
              >
                CONFIRM
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
