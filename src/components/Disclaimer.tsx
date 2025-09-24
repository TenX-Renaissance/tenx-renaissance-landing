import { Card, CardContent } from "@/components/ui/card";

const Disclaimer = () => {
  return (
    <section className="py-12 px-4 relative bg-background">
      <div className="container mx-auto max-w-4xl">
        {/* Disclaimer */}
        <Card className="card-punk border-destructive/20">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-destructive mb-4">⚠️ Important Disclaimer</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              TENX is a meme token created for entertainment purposes only. It has no intrinsic value, 
              no expectation of profit, and no formal roadmap or obligations. Cryptocurrency investments 
              are highly volatile and risky. Do not risk funds you can't afford to lose. Always verify 
              the contract address and do your own research before making any transactions.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Disclaimer;
