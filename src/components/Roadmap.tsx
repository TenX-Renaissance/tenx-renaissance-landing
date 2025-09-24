import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket, Target, Crown, Zap } from "lucide-react";
import mascotSkateboard from "@/assets/mascot-scateboard.png";

const Roadmap = () => {
  const phases = [
    {
      phase: "I",
      title: "Resurface",
      status: "active",
      description: "Launch, 50% burn, LP live, meme kit release.",
      icon: <Rocket className="h-6 w-6" />,
      items: [
        "Fair Launch Completed",
        "50% Token Burn",
        "Liquidity Pool Live",
        "Meme Kit Release",
      ],
    },
    {
      phase: "II",
      title: "Rally",
      status: "upcoming",
      description: "Community quests, meme raids, mascot packs.",
      icon: <Target className="h-6 w-6" />,
      items: [
        "Community Quests",
        "Meme Raid Campaigns", 
        "Mascot Pack Drops",
        "Influencer Partnerships",
      ],
    },
    {
      phase: "III",
      title: "Relics",
      status: "future",
      description: "Optional NFTs and community merch drops.",
      icon: <Crown className="h-6 w-6" />,
      items: [
        "Community NFT Collection",
        "Limited Merch Drops",
        "Exclusive Member Benefits",
        "Renaissance Art Contest",
      ],
    },
    {
      phase: "IV",
      title: "Reign",
      status: "future",
      description: "Community governance, seasonal meme events.",
      icon: <Zap className="h-6 w-6" />,
      items: [
        "DAO Governance Launch",
        "Seasonal Meme Events",
        "Community Treasury",
        "Renaissance Legacy",
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "border-primary text-primary";
      case "upcoming":
        return "border-accent text-accent";
      default:
        return "border-muted-foreground text-muted-foreground";
    }
  };

  const getCardVariant = (status: string) => {
    switch (status) {
      case "active":
        return "card-punk animate-glow";
      case "upcoming":
        return "card-punk";
      default:
        return "card-punk opacity-75";
    }
  };

  return (
    <section id="roadmap" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-primary/5" />
      
      <div className="relative container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <Badge variant="outline" className="border-accent text-accent mb-4">
            The Path to Renaissance
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            <span className="text-amber-500">Renaissance</span>
            <br />
            <span className="text-blue-600">Plan</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our journey from hidden bird to meme legend. Each phase brings us closer to renaissance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {phases.map((phase, index) => (
            <Card 
              key={index}
              className={`${getCardVariant(phase.status)} hover:scale-105 transition-all duration-300 relative`}
            >
              <CardHeader className="text-center pb-4">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge 
                    variant="outline" 
                    className={`${getStatusColor(phase.status)} text-lg font-bold w-12 h-8 rounded-lg flex items-center justify-center`}
                  >
                    {phase.phase}
                  </Badge>
                </div>
                
                <div className={`${phase.status === 'active' ? 'text-primary' : phase.status === 'upcoming' ? 'text-accent' : 'text-muted-foreground'} pt-4`}>
                  {phase.icon}
                </div>
                
                <CardTitle className="text-xl">{phase.title}</CardTitle>
                
                <p className="text-sm text-muted-foreground">
                  {phase.description}
                </p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-2">
                  {phase.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-2 text-sm">
                      <div className={`w-2 h-2 rounded-full ${phase.status === 'active' ? 'bg-primary' : phase.status === 'upcoming' ? 'bg-accent' : 'bg-muted-foreground'}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mascot with roadmap message */}
        <Card className="card-punk max-w-4xl mx-auto">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  <span className="punk-title">The Renaissance</span>
                  <br />
                  <span className="renaissance-accent">Begins Now</span>
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  From the shadows emerges a new era of meme culture. Join us as we write the next chapter 
                  of crypto history, one meme at a time. The flock is gathering, the renaissance has begun.
                </p>
              </div>
              <div className="flex justify-center">
                <img
                  src={mascotSkateboard}
                  alt="TENX Skateboard Mascot"
                  className="w-56 h-auto animate-float"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Roadmap;