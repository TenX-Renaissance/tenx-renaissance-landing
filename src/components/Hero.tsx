import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import mascotFlying from "@/assets/mascot-flying.png";
import { Copy, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSwap } from "@/contexts/SwapContext";
import ChartModal from "@/components/ChartModal";
import { useState } from "react";

const Hero = () => {
  const { toast } = useToast();
  const { openSwap } = useSwap();
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);

  const contractAddress = "0x3aE335b251b3185BEE64c710cA94F11B5EBAd86e";
  const burnTxHash = "0x9e319c249eac2a7564c30203e54c2dc0ad36fee0a821b1cefbb9ee62701fe618";

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Sky-like background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-blue-100 to-blue-200" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-300/30 via-transparent to-purple-200/20" />
      
      {/* Cloud-like decorative elements */}
      <div className="absolute top-20 left-20 w-96 h-32 bg-white/20 rounded-full blur-2xl animate-pulse" />
      <div className="absolute top-40 right-32 w-80 h-24 bg-white/15 rounded-full blur-2xl animate-pulse delay-500" />
      <div className="absolute bottom-32 left-1/4 w-72 h-28 bg-white/10 rounded-full blur-2xl animate-pulse delay-1000" />
      <div className="absolute bottom-20 right-20 w-64 h-20 bg-white/25 rounded-full blur-2xl animate-pulse delay-700" />
      
      {/* Floating particles for atmosphere */}
      <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-white/40 rounded-full animate-bounce" />
      <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white/50 rounded-full animate-bounce delay-300" />
      <div className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce delay-700" />
      
      <div className="relative container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <div className="relative inline-block">
                <Badge variant="outline" className="border-blue-500 text-blue-600 mb-6 relative overflow-hidden group cursor-pointer animate-glow-subtle">
                  <span className="relative z-10">Fair Launch • No Presale • Community Owned</span>
                  
                  {/* Ripple effect */}
                  <div className="absolute inset-0 bg-blue-500/20 scale-0 group-hover:scale-100 transition-transform duration-500 ease-out rounded-full opacity-0 group-hover:opacity-100"></div>
                  
                  {/* Glowing effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 via-blue-500/30 to-blue-600/30 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Pulsing glow */}
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-pulse opacity-0 group-hover:opacity-100"></div>
                  
                  {/* Continuous subtle glow */}
                  <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-ping opacity-20"></div>
                </Badge>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                <span className="text-blue-600">TENX</span>
                <br />
                <span className="text-amber-500">Renaissance</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-slate-700 max-w-xl mx-auto lg:mx-0">
                They've all had their time. The dogs, the frogs, the cats, the rats.
                <br />
                <span className="text-blue-800 font-semibold">
                  Now a hidden bird resurfaces to lead the meme-verse revival.
                </span>
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-slate-600 font-medium">
                <span>✅ Fair Launch</span>
                <span>🔥 50% Supply Burned</span>
                <span>💸 0% Tax</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                variant="hero" 
                size="xl" 
                className="animate-glow"
                onClick={(e) => {
                  e.stopPropagation();
                  openSwap();
                }}
              >
                Buy TENX
              </Button>
              <Button 
                variant="outline-gold" 
                size="xl"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsChartModalOpen(true);
                }}
              >
                View Chart
              </Button>
            </div>

          </div>

          {/* Right side - Mascot */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-punk opacity-20 rounded-full blur-2xl scale-110 animate-pulse" />
              <img
                src={mascotFlying}
                alt="TENX Renaissance Mascot"
                className="relative w-96 lg:w-[28rem] h-auto animate-float drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Contract Info Cards - Full width row below hero content */}
        <div className="pt-6 mt-4">
          <div className="grid md:grid-cols-2 gap-3">
            {/* Contract Address Card */}
            <Card className="card-punk">
              <CardContent className="p-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-600">Contract Address:</span>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(contractAddress, "Contract address")}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(`https://bscscan.com/address/${contractAddress}`, '_blank')}
                        className="h-6 w-6 p-0"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <code className="block text-xs bg-white/80 px-2 py-1 rounded font-mono text-blue-800 border border-blue-200 break-all">
                    {contractAddress}
                  </code>
                </div>
              </CardContent>
            </Card>

            {/* Burn TX Card */}
            <Card className="card-punk">
              <CardContent className="p-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-600">Burn TX:</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(`https://bscscan.com/tx/${burnTxHash}`, '_blank')}
                      className="h-6 w-6 p-0"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                  <code className="block text-xs bg-white/80 px-2 py-1 rounded font-mono text-amber-600 border border-amber-200 break-all">
                    {burnTxHash}
                  </code>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Chart Modal */}
      <ChartModal 
        isOpen={isChartModalOpen} 
        onClose={() => setIsChartModalOpen(false)} 
      />
    </section>
  );
};

export default Hero;