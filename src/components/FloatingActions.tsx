import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, MessageCircle, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

const FloatingActions = () => {
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const contractAddress = "0x...TBD...";

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 800) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress);
    toast({
      title: "Copied!",
      description: "Contract address copied to clipboard",
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-6">
      <Card className="card-punk shadow-2xl">
        <CardContent className="p-4">
          <div className="flex flex-col gap-3">
            <Button
              variant="hero"
              size="lg"
              className="font-bold shadow-punk animate-glow"
            >
              <TrendingUp className="h-5 w-5" />
              Buy TENX
            </Button>
            
            <div className="flex gap-2">
              <Button
                variant="outline-punk"
                size="sm"
                className="flex-1"
              >
                <MessageCircle className="h-4 w-4" />
                Join TG
              </Button>
              
              <Button
                variant="outline-gold"
                size="sm"
                onClick={copyToClipboard}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Quick Actions
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FloatingActions;