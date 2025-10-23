import { useEffect, useState } from "react";
import { TokenDataService } from "@/services/tokenData";

const Circulation = () => {
  const [circulationSupply, setCirculationSupply] = useState<string>("45000000000000000000000000");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // One-time load only - no periodic refresh
    const tokenService = TokenDataService.getInstance();
    tokenService.getCirculationSupply().then((supply) => {
      setCirculationSupply(supply);
      setLoading(false);
    }).catch((error) => {
      console.error("Error loading circulation supply:", error);
      setLoading(false);
    });
  }, []);

  // Plain text display - no HTML tags, just the raw number
  if (loading) {
    return "Loading...";
  }

  return circulationSupply;
};

export default Circulation;
