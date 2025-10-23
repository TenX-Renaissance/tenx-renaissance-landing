import { useTokenData } from "@/services/tokenData";

const Circulation = () => {
  const { circulationSupply, isLoading } = useTokenData();

  // Plain text display - no HTML tags, just the raw number
  if (isLoading) {
    return "Loading...";
  }

  return circulationSupply;
};

export default Circulation;
