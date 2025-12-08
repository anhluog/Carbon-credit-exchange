import { Bell } from 'lucide-react';
import { useState } from 'react';
import { User } from '../types';
import NotificationPanel from './NotificationPanel';

interface NavigationProps {
  user: User | null;
  onDisconnect: () => void;
}

export default function Navigation({ user, onDisconnect }: NavigationProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <nav className="bg-[#0f1419] border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-700 rounded"></div>
            <span className="text-white font-semibold text-lg">NoDy</span>
          </div>

          <div className="flex space-x-6">
            <button className="text-white border-b-2 border-blue-500 pb-1 font-medium">
              MARKETS
            </button>
            <button className="text-gray-400 hover:text-white transition-colors font-medium">
              VERIFY
            </button>
            <button className="text-gray-400 hover:text-white transition-colors font-medium">
              STATISTICAL DATA
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="text-gray-400 hover:text-white transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
          </button>

          <NotificationPanel
            isOpen={showNotifications}
            onClose={() => setShowNotifications(false)}
          />

          {user ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-white text-sm">{user.name}</span>
              </div>
              <button
                onClick={onDisconnect}
                className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition-colors text-sm"
              >
                DISCONNECT
              </button>
            </div>
          ) : (
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm">
              CONNECT WALLET
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
