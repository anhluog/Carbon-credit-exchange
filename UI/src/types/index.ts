export interface CounterProposal {
  name: string;
  avatar: string;
  quantity: string;
  amount: string;
  expires: string;
}

export interface Order {
  id: string;
  pair: string[];
  date: string;
  orderId: string;
  side: string;
  counterparty: {
    name: string;
    avatar: string;
  };
  status: 'Counterproposal' | 'Accepted' | 'Cancelled';
  total: number;
  counterProposals?: CounterProposal[];
}

export interface User {
  name: string;
  avatar: string;
  address?: string;
}
