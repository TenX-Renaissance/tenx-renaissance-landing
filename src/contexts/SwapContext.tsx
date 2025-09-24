import { createContext, useContext, useState, ReactNode } from 'react';

interface SwapContextType {
  isSwapVisible: boolean;
  openSwap: () => void;
  closeSwap: () => void;
  toggleSwap: () => void;
}

const SwapContext = createContext<SwapContextType | undefined>(undefined);

export const useSwap = () => {
  const context = useContext(SwapContext);
  if (!context) {
    throw new Error('useSwap must be used within a SwapProvider');
  }
  return context;
};

interface SwapProviderProps {
  children: ReactNode;
}

export const SwapProvider = ({ children }: SwapProviderProps) => {
  const [isSwapVisible, setIsSwapVisible] = useState(false);

  const openSwap = () => setIsSwapVisible(true);
  const closeSwap = () => setIsSwapVisible(false);
  const toggleSwap = () => setIsSwapVisible(prev => !prev);

  return (
    <SwapContext.Provider value={{
      isSwapVisible,
      openSwap,
      closeSwap,
      toggleSwap
    }}>
      {children}
    </SwapContext.Provider>
  );
};
