import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Twitter, Send, Copy, ExternalLink } from "lucide-react";
import mascotCommand from "@/assets/mascot-command.png";

const Footer = () => {
  const { toast } = useToast();
  
  const contractAddress = "0xF58d3DABd0f71F7a1d1956cE61fd4D945997c520";
  
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const socialLinks = [
    {
      name: "Telegram",
      icon: <Send className="h-5 w-5" />,
      url: "https://t.me/TenXRenaissance_EN",
      description: "Join the main flock",
    },
    {
      name: "Twitter",
      icon: <Twitter className="h-5 w-5" />,
      url: "https://x.com/TenXRenaissance", 
      description: "Follow for updates",
    },
  ];

  return (
    <footer className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-card/20 to-background" />
      
      <div className="relative container mx-auto max-w-6xl">
        {/* Main Footer Content */}
        <Card className="card-punk mb-12">
          <CardContent className="p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Call to Action */}
              <div className="text-center lg:text-left">
                <h2 className="text-4xl lg:text-5xl font-black mb-6">
                  <span className="text-amber-500">Join the</span>
                  <br />
                  <span className="text-blue-600">Flock</span>
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  TENX lives where the memes live. Hop in, grab your mascot pack, 
                  and help steer the renaissance.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {socialLinks.map((link, index) => (
                    <Button
                      key={index}
                      variant="outline-punk"
                      className="flex items-center gap-2 p-4 h-auto"
                      asChild
                    >
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.icon}
                        <div className="text-left">
                          <div className="font-semibold">{link.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {link.description}
                          </div>
                        </div>
                      </a>
                    </Button>
                  ))}
                </div>
                
                <Badge variant="outline" className="border-accent text-accent">
                  The Renaissance Begins Now
                </Badge>
              </div>

              {/* Right side - Mascot */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-renaissance opacity-20 rounded-full blur-2xl scale-110 animate-pulse" />
                  <img
                    src={mascotCommand}
                    alt="TENX Command Mascot"
                    className="relative w-64 lg:w-80 h-auto animate-float"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Footer */}
        <div className="border-t border-border/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">
                <span className="text-blue-600">TENX</span>
                <span className="text-amber-500"> Renaissance</span>
              </h3>
              <p className="text-sm text-muted-foreground">
                The rebirth of meme culture • Fair • Tax-Free • Pure Fun
              </p>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground mb-2">
                Contract Address (Verify Before Buying):
              </p>
              <div className="flex items-center justify-center md:justify-end gap-2">
                <code 
                  className="text-xs bg-card px-3 py-2 rounded font-mono text-primary border cursor-pointer hover:bg-card/80 transition-colors break-all"
                  onClick={() => copyToClipboard(contractAddress, "Contract address")}
                >
                  {contractAddress}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(contractAddress, "Contract address")}
                  className="h-8 w-8 p-0"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(`https://bscscan.com/address/${contractAddress}`, '_blank')}
                  className="h-8 w-8 p-0"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8 pt-8 border-t border-border/25">
            <p className="text-xs text-muted-foreground">
              © 2024 TENX Renaissance • Community Owned • For Entertainment Only
              <br />
              <span className="text-destructive">
                This is not financial advice. Cryptocurrency is volatile. Only invest what you can afford to lose.
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;