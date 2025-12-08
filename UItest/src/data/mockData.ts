import { Order } from '../types';
import { vietnamProvinces } from './vietnamProvinces';

const avatars = [
  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
  'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100',
  'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100',
  'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
  'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100',
];

const counterpartyNames = [
  'Luis Maria Ruiz',
  'Mohammed Montero',
  'Francesc Xavier',
  'Daniel Cantos',
  'Roman Vargas',
];

const pairs = [
  ['BTC', 'ETH'],
  ['BTC', 'USDT'],
  ['ETH', 'USDC'],
  ['BTC', 'ADA'],
  ['SOL', 'USDT'],
];

let orderId = 1;

export const mockOrders: Order[] = [];

vietnamProvinces.forEach((province) => {
  for (let i = 0; i < 10; i++) {
    mockOrders.push({
      id: String(orderId++),
      pair: pairs[i % pairs.length],
      date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).replace(/\//g, '/').split(' ').reverse().join(' '),
      orderId: String(Math.floor(Math.random() * 1e16)).padStart(20, '0'),
      side: province.code,
      counterparty: {
        name: counterpartyNames[i % counterpartyNames.length],
        avatar: avatars[i % avatars.length],
      },
      status: ['Counterproposal', 'Accepted', 'Cancelled'][i % 3] as 'Counterproposal' | 'Accepted' | 'Cancelled',
      total: Math.random() * 100000,
      counterProposals: [
        {
          name: counterpartyNames[(i + 1) % counterpartyNames.length],
          avatar: avatars[(i + 1) % avatars.length],
          quantity: `${(Math.random() * 2).toFixed(2)} BTC`,
          amount: `${(Math.random() * 50000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDC`,
          expires: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US'),
        },
      ],
    });
  }
});

export const mockSellOrders: Order[] = [];

for (let i = 0; i < 5; i++) {
  mockSellOrders.push({
    id: String(orderId++),
    pair: pairs[i % pairs.length],
    date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(/\//g, '/').split(' ').reverse().join(' '),
    orderId: String(Math.floor(Math.random() * 1e16)).padStart(20, '0'),
    side: 'SELL',
    counterparty: {
      name: counterpartyNames[i % counterpartyNames.length],
      avatar: avatars[i % avatars.length],
    },
    status: 'Counterproposal' as const,
    total: Math.random() * 50000,
  });
}
