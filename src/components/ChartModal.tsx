import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ExternalLink, BarChart3, TrendingUp, Activity, Send, Twitter, Mail } from "lucide-react";

interface ChartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChartModal = ({ isOpen, onClose }: ChartModalProps) => {
  const pairAddress = "0x34987aD0EA4785b830900Ef6e0b7b369d2EFf041";
  
  const chartLinks = [
    {
      name: "GeckoTerminal",
      url: `https://www.geckoterminal.com/bsc/pools/${pairAddress}`,
      icon: <BarChart3 className="h-5 w-5" />,
      description: "Advanced charting & analytics"
    },
    {
      name: "DexTools",
      url: `https://www.dextools.io/app/en/bnb/pair-explorer/${pairAddress}?t=1758680243252`,
      icon: <TrendingUp className="h-5 w-5" />,
      description: "Professional trading tools"
    },
    {
      name: "DexScreener",
      url: `https://dexscreener.com/bsc/${pairAddress}`,
      icon: <Activity className="h-5 w-5" />,
      description: "Real-time price tracking"
    }
  ];

  const socialLinks = [
    {
      name: "Telegram",
      url: "https://t.me/TenXRenaissance_EN",
      icon: <Send className="h-5 w-5" />
    },
    {
      name: "Twitter",
      url: "https://x.com/TenXRenaissance",
      icon: <Twitter className="h-5 w-5" />
    },
    {
      name: "Support",
      url: "mailto:support@tencoin.site",
      icon: <Mail className="h-5 w-5" />
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-blue-600">
            📊 View Charts & Analytics
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Chart Links */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-700 text-center">Chart Platforms</h3>
            <div className="space-y-2">
              {chartLinks.map((link, index) => (
                <Card key={index} className="card-punk hover:scale-105 transition-transform duration-200">
                  <CardContent className="p-4">
                    <Button
                      variant="outline-punk"
                      className="w-full justify-between h-auto py-3"
                      asChild
                    >
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        <div className="flex items-center gap-3">
                          {link.icon}
                          <div className="text-left">
                            <div className="font-semibold">{link.name}</div>
                            <div className="text-xs text-slate-500">{link.description}</div>
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-700 text-center">Community</h3>
            <div className="flex gap-3 justify-center">
              {socialLinks.map((link, index) => (
                <Button
                  key={index}
                  variant="outline-punk"
                  className="flex items-center gap-2 px-4 py-2 h-auto"
                  asChild
                >
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.icon}
                    <span className="font-semibold">{link.name}</span>
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChartModal;
