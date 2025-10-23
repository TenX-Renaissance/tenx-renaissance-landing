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
    <div style={{ 
      backgroundColor: '#EBF0F7', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        {loading ? (
          <div style={{ fontSize: '48px', color: '#333', marginBottom: '20px' }}>
            Loading...
          </div>
        ) : (
          <div style={{ fontSize: '48px', color: '#333', marginBottom: '20px' }}>
            {circulationSupply}
          </div>
        )}
      </div>
    </div>
  );
};

export default Circulation;
