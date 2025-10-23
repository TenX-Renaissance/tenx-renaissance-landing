import { useEffect, useState } from "react";

const Circulation = () => {
  const [circulationSupply, setCirculationSupply] = useState<string>("45000000000000000000000000");
  const [loading, setLoading] = useState(true);

  const contractAddress = "0x4575AaC30f08bB618673e0e83af72E43AB4FfD9D";

  useEffect(() => {
    fetchCirculationSupply();
    // Refresh every 30 seconds
    const interval = setInterval(fetchCirculationSupply, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchCirculationSupply = async () => {
    try {
      setLoading(true);
      
      // Check if Web3 is available
      if (typeof window !== "undefined" && (window as any).ethereum) {
        try {
          // Get the current circulation supply by calling balanceOf on the deployer
          // Since only the deployer has cold balance, the circulation is the deployer's reflection balance
          // plus any tokens transferred to other wallets
          
          // For now, we'll use a simplified approach - in a real implementation,
          // you'd need to track all transfers and calculate total circulation
          
          // This is a placeholder - you'd implement proper Web3 calls here
          const deployerAddress = "0xE4D55a5F102d44AE2f042d5dd5a6D249847aaCAf";
          
          // Call balanceOf on the contract
          const balance = await (window as any).ethereum.request({
            method: "eth_call",
            params: [
              {
                to: contractAddress,
                data: `0x70a08231${deployerAddress.slice(2).padStart(64, '0')}`, // balanceOf(deployer)
              },
              "latest",
            ],
          });
          
          // Convert hex to decimal
          const balanceDecimal = parseInt(balance, 16).toString();
          setCirculationSupply(balanceDecimal);
          
        } catch (web3Error) {
          console.error("Web3 error:", web3Error);
          // Fallback to known value if Web3 fails
          setCirculationSupply("45000000000000000000000000");
        }
      } else {
        // Fallback to known value if no Web3
        setCirculationSupply("45000000000000000000000000");
      }
    } catch (error) {
      console.error("Error fetching circulation supply:", error);
      // Fallback to known value
      setCirculationSupply("45000000000000000000000000");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        {loading ? (
          <div className="animate-pulse">
            <div className="h-16 bg-gray-200 rounded mb-8 w-96 mx-auto"></div>
          </div>
        ) : (
          <h1 className="text-6xl font-mono text-gray-800 mb-8">
            {circulationSupply}
          </h1>
        )}
        <p className="text-gray-600 text-lg">
          TENX Circulation Supply
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Updates every 30 seconds
        </p>
      </div>
    </div>
  );
};

export default Circulation;
