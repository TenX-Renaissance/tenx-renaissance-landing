import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, DollarSign, RefreshCw, Users } from "lucide-react";
import { useSwap } from "@/contexts/SwapContext";

const HowToBuy = () => {
  const { openSwap } = useSwap();
  const steps = [
    {
      step: "1",
      title: "Download a Wallet",
      description: "Get MetaMask or your favorite wallet app.",
      icon: <Wallet className="h-8 w-8" />,
      action: "Get MetaMask",
    },
    {
      step: "2", 
      title: "Fund It",
      description: "Buy BNB/ETH and send to your wallet.",
      icon: <DollarSign className="h-8 w-8" />,
      action: "Buy Crypto",
    },
    {
      step: "3",
      title: "Swap",
      description: "Paste the TENX contract on your DEX and swap.",
      icon: <RefreshCw className="h-8 w-8" />,
      action: "Start Swap",
    },
    {
      step: "4",
      title: "Join the Flock",
      description: "Add $TENX to wallet, join socials, start memeing.",
      icon: <Users className="h-8 w-8" />,
      action: "Join Community",
    },
  ];

  return (
    <section id="how-to-buy" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-card/20 to-background/50" />
      
      <div className="relative container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <Badge variant="outline" className="border-accent text-accent mb-4">
            Get Started in 4 Simple Steps
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            <span className="text-amber-500">How to Buy</span>
            <br />
            <span className="text-blue-600">TENX</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to join the renaissance? Follow these simple steps to get your TENX tokens.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card 
              key={index} 
              className="card-punk hover:scale-105 transition-all duration-300 relative group"
            >
              <CardHeader className="text-center pb-4">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge variant="default" className="bg-gradient-punk text-primary-foreground text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center">
                    {step.step}
                  </Badge>
                </div>
                
                <div className="text-primary group-hover:text-accent transition-colors duration-300 pt-4">
                  {step.icon}
                </div>
                
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                
                <Button 
                  variant="outline-punk" 
                  size="sm"
                  className="w-full group-hover:border-accent group-hover:text-accent"
                >
                  {step.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="card-punk max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                <span className="punk-title">Ready to Join?</span>
              </h3>
              <p className="text-muted-foreground mb-6">
                The renaissance is calling. Will you answer?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    openSwap();
                  }}
                >
                  Buy TENX Now
                </Button>
                <Button variant="outline-gold" size="lg">
                  View Chart
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HowToBuy;