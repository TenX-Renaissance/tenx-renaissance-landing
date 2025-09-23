import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Tokenomics from "@/components/Tokenomics";
import HowToBuy from "@/components/HowToBuy";
import Roadmap from "@/components/Roadmap";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <Tokenomics />
      <HowToBuy />
      <Roadmap />
      <FAQ />
      <Footer />
      <FloatingActions />
    </div>
  );
};

export default Index;
