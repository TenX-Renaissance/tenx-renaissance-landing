import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FAQ = () => {
  const faqs = [
    {
      question: "Is TENX an investment?",
      answer: "No. TENX is a meme coin with no intrinsic value, only entertainment. It's created purely for fun and community engagement in the meme culture space.",
    },
    {
      question: "Are there any taxes?",
      answer: "0% buy tax and 0% sell tax. We believe in frictionless trading - all vibes, no fees.",
    },
    {
      question: "Does the team hold any tokens?",
      answer: "None. 100% of tokens went to liquidity pool and 50% were burned. The team holds zero tokens - this is truly community-owned.",
    },
    {
      question: "Will there be NFTs or utility features?",
      answer: "Maybe for fun later, but no promises. We're focused on pure meme culture first. Any future features will be community-driven.",
    },
    {
      question: "How do I verify the real contract?",
      answer: "Only trust the contract address shown at the top of this official site. Always verify before buying and be cautious of copycats.",
    },
    {
      question: "What makes TENX different from other memecoins?",
      answer: "TENX combines punk attitude with renaissance elegance. Our mascot represents the rebirth of meme culture - plus we actually burned 50% of supply at launch.",
    },
    {
      question: "Is this safe to buy?",
      answer: "Crypto is volatile and risky. TENX is experimental and for entertainment only. Never risk more than you can afford to lose. DYOR always.",
    },
  ];

  return (
    <section className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-background to-card/10" />
      
      <div className="relative container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <Badge variant="outline" className="border-primary text-primary mb-4">
            Got Questions?
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            <span className="punk-title">FAQ</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about the TENX Renaissance
          </p>
        </div>

        <Card className="card-punk">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              <span className="renaissance-accent">Frequently Asked Questions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="card-punk mt-12 border-destructive/20">
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

export default FAQ;