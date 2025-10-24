import { useReadContract } from 'wagmi';
import { TENXRenaissanceABI } from '../config/contract';
import { formatEther } from 'viem';

// Use viem's formatEther for proper wei to token conversion
const weiToTokens = (weiValue: bigint): string => {
  return formatEther(weiValue);
};

export const useTokenData = () => {
  const { data: totalSupply, isLoading: totalSupplyLoading, error: totalSupplyError } = useReadContract({
    address: '0x3cc033d5d31f44875be3fF5196B272E8f79D7Fb7' as `0x${string}`,
    abi: TENXRenaissanceABI,
    functionName: 'totalSupply',
  });

  const { data: reflectionSupply, isLoading: reflectionSupplyLoading, error: reflectionSupplyError } = useReadContract({
    address: '0x3cc033d5d31f44875be3fF5196B272E8f79D7Fb7' as `0x${string}`,
    abi: TENXRenaissanceABI,
    functionName: 'reflectionSupply',
  });

  // Calculate frozen supply using BigInt arithmetic
  const frozenSupply = totalSupply && reflectionSupply 
    ? totalSupply - reflectionSupply
    : BigInt(0);

  // Convert BigInt values to token strings with proper precision
  const finalTotalSupply = totalSupply ? weiToTokens(totalSupply) : '0';
  const finalCirculationSupply = reflectionSupply ? weiToTokens(reflectionSupply) : '0';
  const finalFrozenSupply = frozenSupply > 0 ? weiToTokens(frozenSupply) : '0';

  return {
    totalSupply: finalTotalSupply,
    circulationSupply: finalCirculationSupply,
    frozenSupply: finalFrozenSupply,
    isLoading: totalSupplyLoading || reflectionSupplyLoading,
  };
};

export const useWalletBalance = (address: `0x${string}` | undefined) => {
  const { data: reflectionBalance, isLoading: reflectionLoading } = useReadContract({
    address: '0x3cc033d5d31f44875be3fF5196B272E8f79D7Fb7' as `0x${string}`,
    abi: TENXRenaissanceABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  const { data: coldBalance, isLoading: coldLoading } = useReadContract({
    address: '0x3cc033d5d31f44875be3fF5196B272E8f79D7Fb7' as `0x${string}`,
    abi: TENXRenaissanceABI,
    functionName: 'coldBalanceOf',
    args: address ? [address] : undefined,
  });

  return {
    reflectionBalance: reflectionBalance ? weiToTokens(reflectionBalance) : '0',
    coldBalance: coldBalance ? weiToTokens(coldBalance) : '0',
    isLoading: reflectionLoading || coldLoading,
  };
};
