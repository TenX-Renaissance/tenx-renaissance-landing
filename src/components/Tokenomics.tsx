import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PieChart, Flame, Droplets, TrendingUp } from "lucide-react";
import leaderImage from "@/assets/leader-001.png";

const Tokenomics = () => {
  const tokenomics = [
    {
      label: "Total Supply",
      value: "2 × 10³¹ TENX",
      description: "20e30 tokens total",
      icon: <PieChart className="h-5 w-5" />,
      color: "text-primary",
    },
    {
      label: "Burned Supply",
      value: "50%",
      description: "Sent to dead address at launch",
      icon: <Flame className="h-5 w-5" />,
      color: "text-destructive",
    },
    {
      label: "Liquidity Pool",
      value: "50%",
      description: "100% of remaining supply",
      icon: <Droplets className="h-5 w-5" />,
      color: "text-accent",
    },
    {
      label: "Team Tokens",
      value: "0%",
      description: "No team allocation",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "text-muted-foreground",
    },
  ];

  return (
    <section id="tokenomics" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
      
      <div className="relative container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <Badge variant="outline" className="border-primary text-primary mb-4">
            Simple. Transparent.
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            <span className="text-blue-600">Tokenomics</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            No team tokens. No unlock games. Transparent from day one.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {tokenomics.map((item, index) => (
            <Card key={index} className="card-punk hover:scale-105 transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className={item.color}>
                    {item.icon}
                  </div>
                  <CardTitle className="text-lg">{item.label}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className={`text-2xl font-bold ${item.color}`}>
                    {item.value}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Distribution Visualization */}
        <div className="grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 lg:col-span-8">
            <Card className="card-punk">
              <CardHeader>
                <CardTitle className="text-center">Token Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <Flame className="h-4 w-4 text-destructive" />
                      Burned (50%)
                    </span>
                    <span className="font-bold text-destructive">50%</span>
                  </div>
                  <Progress value={50} className="h-3" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-accent" />
                      Liquidity Pool (50%)
                    </span>
                    <span className="font-bold text-accent">50%</span>
                  </div>
                  <Progress value={50} className="h-3" />
                </div>

                <div className="pt-4 border-t border-border/50">
                  <div className="flex justify-between items-center text-sm">
                    <span>Buy Tax</span>
                    <Badge variant="outline" className="border-primary text-primary">0%</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-2">
                    <span>Sell Tax</span>
                    <Badge variant="outline" className="border-primary text-primary">0%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Leader Image */}
          <div className="col-span-12 lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-2xl scale-110 animate-pulse" />
              <img
                src={leaderImage}
                alt="TENX Leader"
                className="relative w-64 lg:w-80 h-auto animate-float drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;