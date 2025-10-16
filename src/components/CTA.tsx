import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTA = () => {
  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            ¿Listo para un Hogar Más Limpio y Feliz?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Únete a miles de dueños satisfechos que han cambiado a Mohhikat. 
            Experimenta la diferencia que hace la calidad premium.
          </p>
          <Button 
            size="lg" 
            variant="outline"
            onClick={scrollToProducts}
            className="bg-white text-primary hover:bg-white/90 border-white text-base font-semibold"
          >
            Comprar Ahora
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};
