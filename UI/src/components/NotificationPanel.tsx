import { X } from 'lucide-react';

interface Notification {
  id: string;
  type: 'buy' | 'sell';
  message: string;
  time: string;
  read: boolean;
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const sampleNotifications: Notification[] = [
  {
    id: '1',
    type: 'buy',
    message: 'Your buy order for 1 BTC at 29,000 USDC has been accepted',
    time: '5 minutes ago',
    read: false,
  },
  {
    id: '2',
    type: 'sell',
    message: 'New counterproposal received for your sell order',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    type: 'buy',
    message: 'Your buy order for 0.5 ETH has been matched',
    time: '3 hours ago',
    read: true,
  },
  {
    id: '4',
    type: 'sell',
    message: 'Your sell order for 2 BTC has expired',
    time: '1 day ago',
    read: true,
  },
  {
    id: '5',
    type: 'buy',
    message: 'Price alert: BTC has reached your target price',
    time: '2 days ago',
    read: true,
  },
];

export default function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 z-40"
        onClick={onClose}
      />
      <div className="fixed top-16 right-6 w-96 bg-[#1a2332] border border-gray-700 rounded-lg shadow-2xl z-50 max-h-[600px] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
          <h3 className="text-white font-semibold text-lg">Notifications</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          {sampleNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`px-4 py-3 border-b border-gray-800 hover:bg-gray-900/50 transition-colors cursor-pointer ${
                !notification.read ? 'bg-blue-900/10' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div
                  className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    notification.type === 'buy' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                <div className="flex-1">
                  <p className="text-gray-300 text-sm">{notification.message}</p>
                  <p className="text-gray-500 text-xs mt-1">{notification.time}</p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 py-3 border-t border-gray-700">
          <button className="text-blue-500 hover:text-blue-400 text-sm font-medium w-full text-center transition-colors">
            Mark all as read
          </button>
        </div>
      </div>
    </>
  );
}
