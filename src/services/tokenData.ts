// Shared token data service to avoid code repetition
export interface TokenData {
  circulationSupply: string;
  totalSupply: string;
  coldBalance: string;
}

export class TokenDataService {
  private static instance: TokenDataService;
  private cache: TokenData | null = null;
  private lastFetch: number = 0;
  private readonly CACHE_DURATION = 30000; // 30 seconds

  private constructor() {}

  public static getInstance(): TokenDataService {
    if (!TokenDataService.instance) {
      TokenDataService.instance = new TokenDataService();
    }
    return TokenDataService.instance;
  }

  public async getTokenData(): Promise<TokenData> {
    const now = Date.now();
    
    // Return cached data if still valid
    if (this.cache && (now - this.lastFetch) < this.CACHE_DURATION) {
      return this.cache;
    }

    try {
      const contractAddress = "0x4575AaC30f08bB618673e0e83af72E43AB4FfD9D";
      
      // Check if Web3 is available
      if (typeof window !== "undefined" && (window as any).ethereum) {
        try {
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
          
          // Calculate other values based on known contract state
          const circulationSupply = balanceDecimal;
          const totalSupply = "1000000000000000000000000000000"; // 1e30
          const coldBalance = (parseInt(totalSupply) - parseInt(circulationSupply)).toString();
          
          this.cache = {
            circulationSupply,
            totalSupply,
            coldBalance
          };
          
        } catch (web3Error) {
          console.error("Web3 error:", web3Error);
          // Fallback to known values
          this.cache = {
            circulationSupply: "45000000000000000000000000",
            totalSupply: "1000000000000000000000000000000",
            coldBalance: "999999999999999999999955000000000000000000000000"
          };
        }
      } else {
        // Fallback to known values if no Web3
        this.cache = {
          circulationSupply: "45000000000000000000000000",
          totalSupply: "1000000000000000000000000000000",
          coldBalance: "999999999999999999999955000000000000000000000000"
        };
      }
      
      this.lastFetch = now;
      return this.cache;
      
    } catch (error) {
      console.error("Error fetching token data:", error);
      // Return fallback values
      return {
        circulationSupply: "45000000000000000000000000",
        totalSupply: "1000000000000000000000000000000",
        coldBalance: "999999999999999999999955000000000000000000000000"
      };
    }
  }

  public async getCirculationSupply(): Promise<string> {
    const data = await this.getTokenData();
    return data.circulationSupply;
  }
}
