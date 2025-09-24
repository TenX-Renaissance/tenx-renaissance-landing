import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

const FloatingActions = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-6">
      <Button
        onClick={scrollToTop}
        size="lg"
        className="rounded-full w-12 h-12 p-0 shadow-2xl bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-110"
        aria-label="Back to top"
      >
        <ArrowUp className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default FloatingActions;