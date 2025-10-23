import { WagmiProvider } from 'wagmi';
import { appKit } from '@/config/walletConnect';

interface WalletConnectProviderProps {
  children: React.ReactNode;
}

const WalletConnectProvider = ({ children }: WalletConnectProviderProps) => {
  return (
    <WagmiProvider config={appKit.wagmiConfig}>
      {children}
    </WagmiProvider>
  );
};

export default WalletConnectProvider;
