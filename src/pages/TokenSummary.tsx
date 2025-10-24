import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ExternalLink, Copy, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useTokenData, useWalletBalance } from "@/services/tokenData";
import { TENXRenaissanceABI } from "@/config/contract";
import { AppKitProvider } from "@/config/appkit";
import { useAppKit } from "@/config/appkit-exports";

const TokenSummary = () => {
  const [unfreezeAmount, setUnfreezeAmount] = useState<string>("");
  const [showUnfreezeForm, setShowUnfreezeForm] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const { writeContract, isPending } = useWriteContract();
  const { open } = useAppKit();

  // Wait for transaction receipt with 3 confirmations
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash as `0x${string}`,
    confirmations: 3,
  });

  // Use Wagmi hooks for real-time data
  const { totalSupply, circulationSupply, frozenSupply, isLoading } = useTokenData();
  const { reflectionBalance, coldBalance, isLoading: walletLoading } = useWalletBalance(address);

  // Debug logging to see raw contract data
  console.log('=== DEBUG: Raw Contract Data ===');
  console.log('totalSupply (raw):', totalSupply);
  console.log('circulationSupply (raw):', circulationSupply);
  console.log('frozenSupply (raw):', frozenSupply);
  console.log('reflectionBalance (raw):', reflectionBalance);
  console.log('coldBalance (raw):', coldBalance);
  console.log('================================');

  const contractAddress = "0x3cc033d5d31f44875be3fF5196B272E8f79D7Fb7";
  const bscScanUrl = `https://bscscan.com/address/${contractAddress}`;

  // Handle transaction confirmation
  useEffect(() => {
    if (isConfirmed && txHash) {
      toast({
        title: "Transaction Confirmed",
        description: `Unfreeze completed successfully! Hash: ${txHash.slice(0, 10)}...`,
      });
      
      // Clear the input and hide form
      setUnfreezeAmount("");
      setShowUnfreezeForm(false);
      setTxHash(null);
    }
  }, [isConfirmed, txHash, toast]);

  // Connect wallet function using AppKit modal
  const connectWallet = () => {
    open();
  };

  // Unfreeze tokens function using Wagmi writeContract (AppKit integration)
  const unfreezeTokens = async () => {
    if (!isConnected || !address) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    if (!unfreezeAmount || parseFloat(unfreezeAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to unfreeze",
        variant: "destructive",
      });
      return;
    }

    try {
      // Convert amount to wei (18 decimals)
      const amountInWei = BigInt(Math.floor(parseFloat(unfreezeAmount) * 1e18));
      
      // Show awaiting approval message
      toast({
        title: "Awaiting Approval",
        description: "Please check your wallet and approve this transaction.",
      });
      
      // Use Wagmi's writeContract (integrated with AppKit)
      writeContract({
        address: contractAddress as `0x${string}`,
        abi: TENXRenaissanceABI,
        functionName: 'unfreeze',
        args: [amountInWei],
        chain: undefined, // Use default chain
        account: address,
      });
      
      // Show submitted message
      toast({
        title: "Transaction Submitted",
        description: "Unfreeze transaction submitted successfully. Please check your wallet for confirmation.",
      });

    } catch (error) {
      console.error("Error unfreezing tokens:", error);
      toast({
        title: "Unfreeze Failed",
        description: `Failed to unfreeze tokens: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
      setTxHash(null);
    }
  };

  const formatNumber = (value: string) => {
    // Handle NaN or invalid values
    if (!value || value === "0" || value === "NaN") {
      return "0";
    }
    
    // Work with string directly to preserve precision
    const str = value.toString();
    const decimalIndex = str.indexOf('.');
    
    // Truncate to exactly 6 decimal places - no rounding, just cut off
    const formatWith6Decimals = (inputStr: string): string => {
      const dotIndex = inputStr.indexOf('.');
      
      if (dotIndex === -1) {
        // No decimal point, add 6 zeros
        return inputStr + '.' + '0'.repeat(6);
      }
      
      const integerPart = inputStr.substring(0, dotIndex);
      const decimalPart = inputStr.substring(dotIndex + 1);
      
      if (decimalPart.length < 6) {
        // Not enough decimals, pad with zeros
        return inputStr + '0'.repeat(6 - decimalPart.length);
      } else if (decimalPart.length > 6) {
        // Too many decimals, truncate without rounding
        return integerPart + '.' + decimalPart.substring(0, 6);
      }
      
      // Exactly 6 decimals
      return inputStr;
    };
    
    // Determine scale by string length, not by parsing to number
    const integerPart = decimalIndex === -1 ? str : str.substring(0, decimalIndex);
    const integerLength = integerPart.length;
    
    // Scale the number to appropriate unit and format with 6 decimals
    let scaledValue: string;
    let unit: string;
    
    if (integerLength >= 31) {
      // Quintillion: divide by 1e30 (for values like 1e30 tokens)
      const scaled = integerPart.slice(0, -30) + '.' + integerPart.slice(-30) + (decimalIndex !== -1 ? str.substring(decimalIndex + 1) : '');
      scaledValue = formatWith6Decimals(scaled);
      unit = " Quintillion";
    } else if (integerLength >= 28) {
      // Quadrillion: divide by 1e27
      const scaled = integerPart.slice(0, -27) + '.' + integerPart.slice(-27) + (decimalIndex !== -1 ? str.substring(decimalIndex + 1) : '');
      scaledValue = formatWith6Decimals(scaled);
      unit = " Quadrillion";
    } else if (integerLength >= 25) {
      // Trillion: divide by 1e24
      const scaled = integerPart.slice(0, -24) + '.' + integerPart.slice(-24) + (decimalIndex !== -1 ? str.substring(decimalIndex + 1) : '');
      scaledValue = formatWith6Decimals(scaled);
      unit = " Trillion";
    } else if (integerLength >= 22) {
      // Billion: divide by 1e21
      const scaled = integerPart.slice(0, -21) + '.' + integerPart.slice(-21) + (decimalIndex !== -1 ? str.substring(decimalIndex + 1) : '');
      scaledValue = formatWith6Decimals(scaled);
      unit = " Billion";
    } else if (integerLength >= 19) {
      // Million: divide by 1e18
      const scaled = integerPart.slice(0, -18) + '.' + integerPart.slice(-18) + (decimalIndex !== -1 ? str.substring(decimalIndex + 1) : '');
      scaledValue = formatWith6Decimals(scaled);
      unit = " Million";
    } else if (integerLength >= 16) {
      // Thousand: divide by 1e15
      const scaled = integerPart.slice(0, -15) + '.' + integerPart.slice(-15) + (decimalIndex !== -1 ? str.substring(decimalIndex + 1) : '');
      scaledValue = formatWith6Decimals(scaled);
      unit = " Thousand";
    } else if (integerLength >= 13) {
      // Billion: divide by 1e12
      const scaled = integerPart.slice(0, -12) + '.' + integerPart.slice(-12) + (decimalIndex !== -1 ? str.substring(decimalIndex + 1) : '');
      scaledValue = formatWith6Decimals(scaled);
      unit = " Billion";
    } else if (integerLength >= 10) {
      // Million: divide by 1e9
      const scaled = integerPart.slice(0, -9) + '.' + integerPart.slice(-9) + (decimalIndex !== -1 ? str.substring(decimalIndex + 1) : '');
      scaledValue = formatWith6Decimals(scaled);
      unit = " Million";
    } else if (integerLength >= 7) {
      // Million: divide by 1e6
      const scaled = integerPart.slice(0, -6) + '.' + integerPart.slice(-6) + (decimalIndex !== -1 ? str.substring(decimalIndex + 1) : '');
      scaledValue = formatWith6Decimals(scaled);
      unit = " Million";
    } else if (integerLength >= 4) {
      // Thousand: divide by 1e3
      const scaled = integerPart.slice(0, -3) + '.' + integerPart.slice(-3) + (decimalIndex !== -1 ? str.substring(decimalIndex + 1) : '');
      scaledValue = formatWith6Decimals(scaled);
      unit = " Thousand";
    } else {
      // No scaling needed
      scaledValue = formatWith6Decimals(str);
      unit = "";
    }
    
    return scaledValue + unit;
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied!",
        description: `${label} copied to clipboard`,
      });
    });
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Token Summary</h1>
        </div>

        {/* Wallet Connection Status */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Wallet Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isConnected && address ? (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Connected Wallet:</p>
                <div className="flex items-center gap-2">
                  <code className="text-gray-800 font-mono bg-gray-100 px-2 py-1 rounded">
                    {shortenAddress(address)}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(address, "Wallet address")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-gray-600">No wallet connected</p>
                <div className="relative">
                  <Button onClick={connectWallet} className="flex items-center gap-2">
                    <Wallet className="h-4 w-4" />
                    Connect Wallet
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contract Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Contract Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Contract Address:</p>
              <div className="flex items-center gap-2">
                <code className="text-gray-800 font-mono bg-gray-100 px-2 py-1 rounded">
                  {contractAddress}
                </code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(contractAddress, "Contract address")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(bscScanUrl, "_blank")}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Supply Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Circulation</CardTitle>
              <CardDescription>Available for trading</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-600">
                {isLoading ? "Loading..." : formatNumber(circulationSupply)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                45 Million (4.5e7 [7 zeros][18 decimals])
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Frozen</CardTitle>
              <CardDescription>Locked in cold storage</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-orange-600">
                {isLoading ? "Loading..." : formatNumber(frozenSupply)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                999 Quadrillion (9.99e26 [26 zeros][18 decimals])
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Total</CardTitle>
              <CardDescription>Maximum supply</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">
                {isLoading ? "Loading..." : formatNumber(totalSupply)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                1 Quintillion (1e30 [30 zeros][18 decimals])
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Wallet Balances */}
        {isConnected && address && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Your Reflection Balance</CardTitle>
                <CardDescription>Spendable tokens</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-blue-600">
                  {walletLoading ? "Loading..." : formatNumber(reflectionBalance)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  45 Million (4.5e7 [7 zeros][18 decimals])
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Your Cold Balance</CardTitle>
                <CardDescription>
                  <span className="flex items-center gap-2">
                    Frozen tokens
                    {parseFloat(coldBalance) > 0 && (
                      <button 
                        className="inline-flex items-center rounded-full border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-200 cursor-pointer"
                        onClick={() => setShowUnfreezeForm(!showUnfreezeForm)}
                      >
                        {showUnfreezeForm ? "Hide" : "Unfreeze"}
                      </button>
                    )}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-orange-600 mb-4">
                  {walletLoading ? "Loading..." : formatNumber(coldBalance)}
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  999 Quadrillion (9.99e26 [26 zeros][18 decimals])
                </p>
                
                {/* Inline unfreeze form */}
                {showUnfreezeForm && parseFloat(coldBalance) > 0 && (
                  <span className="flex items-center gap-2 pt-2 border-t border-gray-200">
                    <Input
                      type="number"
                      placeholder="Amount"
                      value={unfreezeAmount}
                      onChange={(e) => setUnfreezeAmount(e.target.value)}
                      className="text-sm h-8 flex-1"
                    />
                    <Button
                      onClick={unfreezeTokens}
                      disabled={isPending || isConfirming || !unfreezeAmount || parseFloat(unfreezeAmount) <= 0}
                      size="sm"
                      className="h-8 px-3"
                    >
                      {isPending ? "Awaiting Approval..." : isConfirming ? "Confirming..." : "Unfreeze"}
                    </Button>
                    <Button
                      onClick={() => {
                        setShowUnfreezeForm(false);
                        setUnfreezeAmount("");
                      }}
                      variant="ghost"
                      size="sm"
                      className="h-8 px-3"
                    >
                      Cancel
                    </Button>
                  </span>
                )}
              </CardContent>
            </Card>
          </div>
        )}

      </div>
    </div>
  );
};

// Wrap TokenSummary with AppKitProvider for wallet functionality
const TokenSummaryWithProvider = () => (
  <AppKitProvider>
    <TokenSummary />
  </AppKitProvider>
);

export default TokenSummaryWithProvider;