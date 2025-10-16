import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import logo from "@/assets/logo.png";
import heroBg from "@/assets/gatito-bg.jpg";

export const Hero = () => {
  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-accent/20">
      {/* Fondo con el gatito */}
      <div
        className="absolute inset-0 opacity-[0.18] bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col items-center text-center">
          <img
            src={logo}
            alt="Mohhikat Logo"
            className="w-80 md:w-[26rem] mb-8 animate-fade-in"
          />

          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground max-w-4xl">
            Arena Premium para Gatos para un Hogar
            <span className="text-primary"> Más Limpio</span> y
            <span className="text-secondary"> Feliz</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
            Experimenta absorción superior, control de polvo y confort ecológico.
            Mohhikat ofrece la arena para gatos de mayor calidad al mejor precio.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={scrollToProducts}
              className="text-base"
            >
              Comprar Ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() =>
                document.getElementById("features")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="text-base"
            >
              Conocer Más
            </Button>
          </div>
        </div>
      </div>

      {/* Efectos decorativos */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
    </section>
  );
};
