import { Droplets, Leaf, Sparkles, Shield, Users, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Droplets,
    title: "Máxima Absorción",
    description: "Tecnología superior de aglomeración que retiene la humedad al instante, manteniendo la caja limpia y fresca.",
  },
  {
    icon: Sparkles,
    title: "Control de Polvo",
    description: "Fórmula avanzada que minimiza el polvo para un aire más limpio y respiración más saludable para ti y tus gatos.",
  },
  {
    icon: Leaf,
    title: "Ecológico",
    description: "Elaborado con materiales sustentables que son seguros para tus mascotas y no dañan los mantos acuíferos.",
  },
  {
    icon: Shield,
    title: "Espacios Limpios",
    description: "Potente control de olores mantiene tu hogar fresco todo el día, todos los días.",
  },
  {
    icon: Users,
    title: "Uso Multigato",
    description: "Perfecto para hogares con múltiples gatos. Lo suficientemente fuerte para toda la familia.",
  },
  {
    icon: Award,
    title: "Mejor Calidad",
    description: "Ingredientes premium y pruebas rigurosas aseguran la más alta calidad del mercado.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            ¿Por Qué Elegir Mohhikat?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calidad premium con valor inigualable. Descubre qué hace a Mohhikat la mejor elección para tus gatos.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.title}
                className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
