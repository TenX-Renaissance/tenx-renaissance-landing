import { useEffect, useState } from "react";

const Circulation = () => {
  const [circulationSupply, setCirculationSupply] = useState<string>("45000000");

  useEffect(() => {
    // Simple fallback value for circulation supply
    // This page should not have wallet functionality
    setCirculationSupply("45000000");
  }, []);

  // Plain text display - no HTML tags, just the raw number
  return circulationSupply;
};

export default Circulation;
