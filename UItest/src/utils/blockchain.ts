export interface Web3Provider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
}

export interface BlockchainConfig {
  chainId: string;
  rpcUrl: string;
  contractAddress: string;
}

export const connectWallet = async (): Promise<string | null> => {
  if (typeof window !== 'undefined' && (window as { ethereum?: Web3Provider }).ethereum) {
    try {
      const ethereum = (window as { ethereum: Web3Provider }).ethereum;
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      }) as string[];

      return accounts[0] || null;
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      return null;
    }
  }
  return null;
};

export const disconnectWallet = () => {
  console.log('Wallet disconnected');
};

export const getBalance = async (address: string): Promise<string> => {
  if (typeof window !== 'undefined' && (window as { ethereum?: Web3Provider }).ethereum) {
    try {
      const ethereum = (window as { ethereum: Web3Provider }).ethereum;
      const balance = await ethereum.request({
        method: 'eth_getBalance',
        params: [address, 'latest'],
      });

      return balance as string;
    } catch (error) {
      console.error('Failed to get balance:', error);
      return '0';
    }
  }
  return '0';
};
