import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ExternalLink, Copy, Wallet, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAccount, useWriteContract } from 'wagmi';
import { useTokenData, useWalletBalance } from "@/services/tokenData";
import { TENXRenaissanceABI } from "@/config/contract";

const TokenSummary = () => {
  const [unfreezeAmount, setUnfreezeAmount] = useState<string>("");
  const appkitButtonRef = useRef<HTMLElement>(null);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const { writeContract, isPending } = useWriteContract();

  // Use Wagmi hooks for real-time data
  const { totalSupply, circulationSupply, frozenSupply, isLoading } = useTokenData();
  const { reflectionBalance, coldBalance, isLoading: walletLoading } = useWalletBalance(address);

  const contractAddress = "0x4575AaC30f08bB618673e0e83af72E43AB4FfD9D";
  const bscScanUrl = `https://bscscan.com/address/${contractAddress}`;

  // Connect wallet function using AppKit modal
  const connectWallet = () => {
    // Trigger the AppKit modal by clicking the appkit-button
    if (appkitButtonRef.current) {
      appkitButtonRef.current.click();
    } else {
      // Fallback: try to find and click the appkit-button
      const appkitButton = document.querySelector('appkit-button') as HTMLElement;
      if (appkitButton) {
        appkitButton.click();
      }
    }
  };

  // Unfreeze tokens function using Wagmi
  const unfreezeTokens = async () => {
    if (!isConnected) {
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
      
      // Call unfreeze function using Wagmi
      writeContract({
        address: contractAddress as `0x${string}`,
        abi: TENXRenaissanceABI,
        functionName: 'unfreeze',
        args: [amountInWei],
      });

      toast({
        title: "Transaction Submitted",
        description: "Unfreeze transaction submitted successfully",
      });

      // Clear the input
      setUnfreezeAmount("");

    } catch (error) {
      console.error("Error unfreezing tokens:", error);
      toast({
        title: "Unfreeze Failed",
        description: "Failed to unfreeze tokens. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatNumber = (value: string) => {
    // Handle NaN or invalid values
    if (!value || value === "0" || value === "NaN" || isNaN(parseFloat(value))) {
      return "0";
    }
    
    const num = parseFloat(value);
    
    // Simple formatting for large numbers (with 5 decimal places, rounded down)
    if (num >= 1e30) {
      return (Math.floor(num / 1e30 * 100000) / 100000).toFixed(5) + " Quintillion";
    } else if (num >= 1e27) {
      return (Math.floor(num / 1e27 * 100000) / 100000).toFixed(5) + " Quadrillion";
    } else if (num >= 1e24) {
      return (Math.floor(num / 1e24 * 100000) / 100000).toFixed(5) + " Trillion";
    } else if (num >= 1e21) {
      return (Math.floor(num / 1e21 * 100000) / 100000).toFixed(5) + " Billion";
    } else if (num >= 1e18) {
      return (Math.floor(num / 1e18 * 100000) / 100000).toFixed(5) + " Million";
    } else if (num >= 1e15) {
      return (Math.floor(num / 1e15 * 100000) / 100000).toFixed(5) + " Thousand";
    } else if (num >= 1e12) {
      return (Math.floor(num / 1e12 * 100000) / 100000).toFixed(5) + " Billion";
    } else if (num >= 1e9) {
      return (Math.floor(num / 1e9 * 100000) / 100000).toFixed(5) + " Million";
    } else if (num >= 1e6) {
      return (Math.floor(num / 1e6 * 100000) / 100000).toFixed(5) + " Million";
    } else if (num >= 1e3) {
      return (Math.floor(num / 1e3 * 100000) / 100000).toFixed(5) + " Thousand";
    }
    
    return num.toLocaleString();
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
                  {/* Hidden AppKit button for modal trigger */}
                  <appkit-button ref={appkitButtonRef} style={{ display: 'none' }} />
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Your Cold Balance</CardTitle>
                <CardDescription>Frozen tokens</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-orange-600">
                  {walletLoading ? "Loading..." : formatNumber(coldBalance)}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Unfreeze Tokens */}
        {isConnected && address && parseFloat(coldBalance) > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Unfreeze Tokens
              </CardTitle>
              <CardDescription>
                Move tokens from cold storage to reflection balance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="unfreeze-amount">Amount to Unfreeze</Label>
                  <Input
                    id="unfreeze-amount"
                    type="number"
                    placeholder="Enter amount"
                    value={unfreezeAmount}
                    onChange={(e) => setUnfreezeAmount(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <Button
                  onClick={unfreezeTokens}
                  disabled={isPending || !unfreezeAmount || parseFloat(unfreezeAmount) <= 0}
                  className="w-full"
                >
                  {isPending ? "Processing..." : "Unfreeze Tokens"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TokenSummary;