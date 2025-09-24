import { Card, CardContent } from "@/components/ui/card";
import coinImage from "@/assets/coin.png";

const About = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-card/10" />
      
      <div className="relative container mx-auto max-w-6xl">
        <div className="grid grid-cols-12 gap-8 items-center">
          {/* Coin Image - 3/12 width, left side */}
          <div className="col-span-12 lg:col-span-3 flex justify-center lg:justify-start">
            <Card className="bg-transparent border-0 shadow-none">
              <CardContent className="p-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-2xl scale-110 animate-pulse" />
                  <img
                    src={coinImage}
                    alt="TENX Coin"
                    className="relative w-full h-auto animate-float drop-shadow-2xl"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* About Content - 9/12 width */}
          <div className="col-span-12 lg:col-span-9">
            <Card className="card-punk">
              <CardContent className="p-8">
                <div className="text-center lg:text-left">
                  <h2 className="text-3xl lg:text-4xl font-black mb-6">
                    <span className="text-blue-600">About</span>
                    <span className="text-amber-500"> TENX</span>
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Our meme-driven token brings the fierce spirit of rebellion and rebirth, symbolized by our bold blue mascot. 
                    More than just a coin, it represents community strength, humor, and fearless innovation in the crypto world. 
                    Backed by a clear vision, transparent mechanics, and a vibrant culture, this token is designed to spark viral 
                    growth, inspire creativity, and reward early believers who join the movement.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
