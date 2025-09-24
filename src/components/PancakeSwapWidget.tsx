import { useEffect, useRef } from "react";

interface PancakeSwapWidgetProps {
  tokenAddress: string;
  isVisible: boolean;
}

const PancakeSwapWidget = ({ tokenAddress, isVisible }: PancakeSwapWidgetProps) => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible || !widgetRef.current) return;

    // Load PancakeSwap Widget
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@pancakeswap/widgets-internal@latest/dist/index.js';
    script.async = true;
    
    script.onload = () => {
      if (window.PancakeSwap && widgetRef.current) {
        // Initialize the widget
        const widget = new window.PancakeSwap.Widget({
          el: widgetRef.current,
          defaultInputCurrency: 'BNB', // BNB as default input
          defaultOutputCurrency: tokenAddress,
          theme: 'dark', // or 'light' based on your theme
          width: '100%',
          height: '600px'
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [isVisible, tokenAddress]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-center">
            Buy <span className="text-blue-600">TENX</span> on PancakeSwap
          </h3>
        </div>
        <div className="p-4">
          <div ref={widgetRef} className="w-full h-[600px]" />
        </div>
      </div>
    </div>
  );
};

// Fallback iframe approach if widget doesn't work
const PancakeSwapIframe = ({ tokenAddress, isVisible }: PancakeSwapWidgetProps) => {
  if (!isVisible) return null;

  const iframeSrc = `https://pancakeswap.finance/swap?outputCurrency=${tokenAddress}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-center">
            Buy <span className="text-blue-600">TENX</span> on PancakeSwap
          </h3>
        </div>
        <iframe
          src={iframeSrc}
          className="w-full h-[600px] border-0"
          title="PancakeSwap Swap"
        />
      </div>
    </div>
  );
};

export default PancakeSwapIframe;
