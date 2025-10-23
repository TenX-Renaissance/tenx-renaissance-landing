import { useReadContract } from 'wagmi';
import { TENXRenaissanceABI } from '../config/contract';

interface TokenData {
  totalSupply: string;
  circulationSupply: string;
  frozenSupply: string;
}

class TokenDataService {
  private static instance: TokenDataService;
  private cache: TokenData | null = null;
  private readonly CONTRACT_ADDRESS = '0x4575AaC30f08bB618673e0e83af72E43AB4FfD9D';
  private readonly DEPLOYER_ADDRESS = '0x4575AaC30f08bB618673e0e83af72E43AB4FfD9D'; // Same as contract deployer

  private constructor() {}

  public static getInstance(): TokenDataService {
    if (!TokenDataService.instance) {
      TokenDataService.instance = new TokenDataService();
    }
    return TokenDataService.instance;
  }

  public async getTokenData(): Promise<TokenData> {
    if (this.cache) {
      return this.cache;
    }

    try {
      // For now, return fallback values until we implement the hook-based approach
      this.cache = {
        totalSupply: (1e30).toString(), // 1 Quintillion after burn
        circulationSupply: (45e6).toString(), // 45 Million reflection supply
        frozenSupply: ((1e30) - (45e6)).toString() // Remaining frozen supply
      };
      
      return this.cache;
    } catch (error) {
      console.error('Error getting token data:', error);
      
      // Fallback to realistic values based on contract logic
      this.cache = {
        totalSupply: (1e30).toString(), // 1 Quintillion after burn
        circulationSupply: (45e6).toString(), // 45 Million reflection supply
        frozenSupply: ((1e30) - (45e6)).toString() // Remaining frozen supply
      };
      
      return this.cache;
    }
  }

  public async getCirculationSupply(): Promise<string> {
    const data = await this.getTokenData();
    return data.circulationSupply;
  }

  public async getFrozenSupply(): Promise<string> {
    const data = await this.getTokenData();
    return data.frozenSupply;
  }

  public async getTotalSupply(): Promise<string> {
    const data = await this.getTokenData();
    return data.totalSupply;
  }

  public async getWalletReflectionBalance(address: string): Promise<string> {
    try {
      // For now, return fallback value
      return "0";
    } catch (error) {
      console.error('Error getting wallet reflection balance:', error);
      return "0";
    }
  }

  public async getWalletColdBalance(address: string): Promise<string> {
    try {
      // For now, return fallback value
      return "0";
    } catch (error) {
      console.error('Error getting wallet cold balance:', error);
      return "0";
    }
  }
}

// Hook-based functions for React components
export const useTokenData = () => {
  const { data: totalSupply, isLoading: totalSupplyLoading } = useReadContract({
    address: '0x4575AaC30f08bB618673e0e83af72E43AB4FfD9D' as `0x${string}`,
    abi: TENXRenaissanceABI,
    functionName: 'totalSupply',
  });

  const { data: reflectionSupply, isLoading: reflectionSupplyLoading } = useReadContract({
    address: '0x4575AaC30f08bB618673e0e83af72E43AB4FfD9D' as `0x${string}`,
    abi: TENXRenaissanceABI,
    functionName: '_reflectionSupply',
  });

  // Calculate frozen supply as total supply minus circulation supply
  // This avoids needing the deployer address
  const frozenSupply = totalSupply && reflectionSupply 
    ? (Number(totalSupply) - Number(reflectionSupply)) / 1e18 
    : 0;

  return {
    totalSupply: totalSupply ? (Number(totalSupply) / 1e18).toString() : '0',
    circulationSupply: reflectionSupply ? (Number(reflectionSupply) / 1e18).toString() : '0',
    frozenSupply: frozenSupply.toString(),
    isLoading: totalSupplyLoading || reflectionSupplyLoading,
  };
};

export const useWalletBalance = (address: `0x${string}` | undefined) => {
  const { data: reflectionBalance, isLoading: reflectionLoading } = useReadContract({
    address: '0x4575AaC30f08bB618673e0e83af72E43AB4FfD9D' as `0x${string}`,
    abi: TENXRenaissanceABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  const { data: coldBalance, isLoading: coldLoading } = useReadContract({
    address: '0x4575AaC30f08bB618673e0e83af72E43AB4FfD9D' as `0x${string}`,
    abi: TENXRenaissanceABI,
    functionName: '_coldBalances',
    args: address ? [address] : undefined,
  });

  return {
    reflectionBalance: reflectionBalance ? (Number(reflectionBalance) / 1e18).toString() : '0',
    coldBalance: coldBalance ? (Number(coldBalance) / 1e18).toString() : '0',
    isLoading: reflectionLoading || coldLoading,
  };
};

export default TokenDataService;