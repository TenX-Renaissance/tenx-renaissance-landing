import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import mascotHero from "@/assets/mascot-hero.png";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Hero = () => {
  const { toast } = useToast();

  const contractAddress = "0x...TBD...";
  const burnTxHash = "0x...TBD...";

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-hero opacity-80" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="border-primary text-primary mb-6">
                Fair Launch • No Presale • Community Owned
              </Badge>
              
              <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                <span className="punk-title">TENX</span>
                <br />
                <span className="renaissance-accent">Renaissance</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
                They've all had their time. The dogs, the frogs, the cats, the rats.
                <br />
                <span className="text-primary font-semibold">
                  Now a hidden bird resurfaces to lead the meme-verse revival.
                </span>
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-accent font-medium">
                <span>✅ Fair Launch</span>
                <span>🔥 50% Supply Burned</span>
                <span>💸 0% Tax</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="xl" className="animate-glow">
                Buy TENX
              </Button>
              <Button variant="outline-gold" size="xl">
                Join the Flock
              </Button>
            </div>

            {/* Contract Info */}
            <div className="space-y-3 pt-6 border-t border-border/50">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <span className="text-sm text-muted-foreground">Contract:</span>
                <code className="text-xs bg-card px-2 py-1 rounded font-mono text-primary">
                  {contractAddress}
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => copyToClipboard(contractAddress, "Contract address")}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <span className="text-sm text-muted-foreground">Burn TX:</span>
                <code className="text-xs bg-card px-2 py-1 rounded font-mono text-accent">
                  {burnTxHash}
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => copyToClipboard(burnTxHash, "Burn transaction hash")}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right side - Mascot */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-punk opacity-20 rounded-full blur-2xl scale-110 animate-pulse" />
              <img
                src={mascotHero}
                alt="TENX Renaissance Mascot"
                className="relative w-80 lg:w-96 h-auto animate-float drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;