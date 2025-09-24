import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navItems = [
  { href: "#hero", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#tokenomics", label: "Tokenomics" },
  { href: "#how-to-buy", label: "How to Buy" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#faq", label: "FAQ" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-slate-800/50 bg-slate-900/98 backdrop-blur supports-[backdrop-filter]:bg-slate-900/95">
      <div className="container mx-auto max-w-6xl h-16 flex items-center justify-between px-4">
        <a href="#hero" className="font-black text-xl">
          <span className="text-blue-200">TENX</span>
          <span className="text-amber-300"> Renaissance</span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-blue-100 hover:text-amber-300 transition-colors">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="mt-8 flex flex-col gap-4">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    className="text-left text-blue-100 hover:text-amber-300 transition-colors"
                    onClick={() => handleNavClick(item.href)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;


