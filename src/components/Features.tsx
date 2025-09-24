import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, Shield, Zap, Users } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Fair Launch",
      description: "Everyone starts equal. No presale, no team allocation.",
      badge: "✅ Transparent",
    },
    {
      icon: <Flame className="h-8 w-8" />,
      title: "50% Burned",
      description: "Deflationary kickoff with massive burn to dead address.",
      badge: "🔥 Deflationary",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "0% Tax",
      description: "No friction. Pure fun. All vibes, no taxes.",
      badge: "💸 Tax-Free",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community First",
      description: "Built by the community, for the community. Pure meme culture.",
      badge: "🎭 Meme-First",
    },
  ];

  return (
    <section id="features" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-card/20" />
      
      <div className="relative container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            <span className="text-blue-600">The Meme-Renaissance</span>
            <br />
            <span className="text-amber-500">Takes Flight</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            TENX is a community-first memecoin mixing punk attitude with renaissance flair.
            No presale. No taxes. No promises. Just pure meme culture.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="card-punk hover:scale-105 transition-all duration-300 group"
            >
              <CardContent className="p-6 text-center space-y-4">
                <Badge variant="outline" className="border-accent text-accent mb-2">
                  {feature.badge}
                </Badge>
                
                <div className="text-primary group-hover:text-accent transition-colors duration-300">
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold text-foreground">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;