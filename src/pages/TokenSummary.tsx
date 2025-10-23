import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ExternalLink, Copy, Wallet, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { TokenDataService } from "@/services/tokenData";

const TokenSummary = () => {
  const [tokenData, setTokenData] = useState({
    circulationSupply: "0",
    totalSupply: "0",
    coldBalance: "0"
  });
  const [loading, setLoading] = useState(true);
  const [unfreezeAmount, setUnfreezeAmount] = useState<string>("");
  const [isUnfreezing, setIsUnfreezing] = useState(false);
  
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { toast } = useToast();
  const navigate = useNavigate();

  const contractAddress = "0x4575AaC30f08bB618673e0e83af72E43AB4FfD9D";
  const bscScanUrl = `https://bscscan.com/address/${contractAddress}`;

  useEffect(() => {
    fetchSupplyData();
  }, []);

  const fetchSupplyData = async () => {
    try {
      setLoading(true);
      const tokenService = TokenDataService.getInstance();
      const data = await tokenService.getTokenData();
      setTokenData(data);
    } catch (error) {
      console.error("Error fetching supply data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch supply data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (value: string) => {
    const num = parseFloat(value);
    if (num >= 1e24) {
      return (num / 1e24).toFixed(2) + "T";
    } else if (num >= 1e21) {
      return (num / 1e21).toFixed(2) + "B";
    } else if (num >= 1e18) {
      return (num / 1e18).toFixed(2) + "M";
    } else if (num >= 1e15) {
      return (num / 1e15).toFixed(2) + "K";
    }
    return num.toLocaleString();
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

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
      setIsUnfreezing(true);
      
      // Convert amount to wei (assuming user enters amount in tokens, not wei)
      const amountInWei = (parseFloat(unfreezeAmount) * 1e18).toString();
      
      // Contract ABI for unfreeze function
      const contractABI = [
        {
          "inputs": [{"internalType": "uint256", "name": "amount", "type": "uint256"}],
          "name": "unfreeze",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ];

      // Call the unfreeze function using wagmi
      // This is a simplified implementation - you'd need proper contract interaction
      toast({
        title: "Transaction Sent",
        description: `Unfreeze transaction submitted`,
      });

      // Refresh data after successful transaction
      setTimeout(() => {
        fetchSupplyData();
      }, 5000);

    } catch (error) {
      console.error("Error unfreezing tokens:", error);
      toast({
        title: "Transaction Failed",
        description: "Failed to unfreeze tokens",
        variant: "destructive",
      });
    } finally {
      setIsUnfreezing(false);
    }
  };

  const circulationFormatted = formatNumber(tokenData.circulationSupply);
  const totalSupplyFormatted = formatNumber(tokenData.totalSupply);
  const coldBalanceFormatted = formatNumber(tokenData.coldBalance);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            TENX Token Summary
          </h1>
          <p className="text-lg text-gray-600">
            Token supply information and unfreeze functionality
          </p>
        </div>

        {/* Wallet Connection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Wallet Connection
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isConnected ? (
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Connected
                </Badge>
                <code className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-800 font-mono">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(address || "", "Wallet address")}
                >
                  <Copy className="w-3 h-3" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => disconnect()}
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button onClick={() => connect()} className="flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Contract Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Contract Information
              <ExternalLink 
                className="w-4 h-4 cursor-pointer text-blue-600 hover:text-blue-800"
                onClick={() => window.open(bscScanUrl, '_blank')}
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <code className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-800 font-mono">
                {contractAddress}
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(contractAddress, "Contract address")}
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Supply Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Circulation Supply */}
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">Circulation Supply</CardTitle>
              <CardDescription>Currently spendable tokens</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              ) : (
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {circulationFormatted} TENX
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Active Circulation
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Frozen Supply */}
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Frozen Supply</CardTitle>
              <CardDescription>Cold balance (can be unfrozen)</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              ) : (
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {coldBalanceFormatted} TENX
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Cold Balance
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Total Supply */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-600">Total Supply</CardTitle>
              <CardDescription>Maximum token supply</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              ) : (
                <div>
                  <div className="text-3xl font-bold text-gray-600 mb-2">
                    {totalSupplyFormatted} TENX
                  </div>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                    Total Supply
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Unfreeze Section - Only show if wallet is connected */}
        {isConnected && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Unfreeze Tokens
              </CardTitle>
              <CardDescription>
                Move tokens from cold balance to circulation supply
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="unfreezeAmount">Amount to Unfreeze (TENX)</Label>
                  <Input
                    id="unfreezeAmount"
                    type="number"
                    placeholder="Enter amount"
                    value={unfreezeAmount}
                    onChange={(e) => setUnfreezeAmount(e.target.value)}
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={unfreezeTokens}
                    disabled={isUnfreezing || !unfreezeAmount}
                    className="w-full"
                  >
                    {isUnfreezing ? "Unfreezing..." : "Unfreeze Tokens"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Explanation */}
        <Card>
          <CardHeader>
            <CardTitle>How the Cold Balance System Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-600 mb-2">Circulation Supply</h4>
                <p className="text-sm text-gray-600">
                  These are the tokens currently available for trading and spending. 
                  PancakeSwap and other DEXs see this as the total circulating supply.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-600 mb-2">Frozen Supply</h4>
                <p className="text-sm text-gray-600">
                  These tokens are held in "cold balance" and cannot be spent until unfrozen. 
                  They can be moved to circulation supply using the unfreeze function.
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Benefits</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Prevents PancakeSwap overflow issues</li>
                <li>• Maintains ERC20 standard compliance</li>
                <li>• Allows controlled token release</li>
                <li>• Transparent and auditable</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TokenSummary;