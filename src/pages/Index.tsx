import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import Tokenomics from "@/components/Tokenomics";
import HowToBuy from "@/components/HowToBuy";
import Roadmap from "@/components/Roadmap";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Disclaimer from "@/components/Disclaimer";
import FloatingActions from "@/components/FloatingActions";
import PancakeSwapWidget from "@/components/PancakeSwapWidget";
import { SwapProvider, useSwap } from "@/contexts/SwapContext";

const IndexContent = () => {
  const { isSwapVisible, closeSwap } = useSwap();
  const contractAddress = "0x4575AaC30f08bB618673e0e83af72E43AB4FfD9D";

  return (
    <div className="min-h-screen" onClick={closeSwap}>
      <Header />
      <div className="h-16" />
      <Hero />
      <About />
      <Features />
      <Tokenomics />
      <HowToBuy />
      <Roadmap />
      <FAQ />
      <Footer />
      <Disclaimer />
      <FloatingActions />
      
      {/* PancakeSwap Widget */}
      <PancakeSwapWidget 
        tokenAddress={contractAddress} 
        isVisible={isSwapVisible}
      />
    </div>
  );
};

const Index = () => {
  return (
    <SwapProvider>
      <IndexContent />
    </SwapProvider>
  );
};

export default Index;
