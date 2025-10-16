import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";

// ✅ Importa correctamente las imágenes (ajusta extensión si es .png)
import arenaFresh from "@/assets/product-fresh.jpg";
import arenaPremium from "@/assets/product-premium.jpg";

export default function Suscripciones() {
  const { addItem } = useCart();

  const productos = [
    {
      id: "sub_fresh",
      name: "Arena Fresh (10kg)",
      description: "Control de olores y gran absorción. Ideal para gatos domésticos.",
      price: 139.99,
      type: "subscription" as const,
      image: arenaFresh,
    },
    {
      id: "sub_premium",
      name: "Arena Premium (7kg)",
      description: "Arena ultra absorbente con control total de olores y sin polvo.",
      price: 149.99,
      type: "subscription" as const,
      image: arenaPremium,
    },
  ];

  return (
    <main className="flex-1 container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-6">Suscripciones Mohhikat</h1>
      <p className="text-center text-muted-foreground mb-12">
        Recibe tu arena para gatos automáticamente cada mes. 
        Disfruta de envío gratuito dentro de CDMX y descuentos exclusivos.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        {productos.map((producto) => (
          <Card key={producto.id} className="shadow-md">
            <CardHeader>
              <img
                src={producto.image}
                alt={producto.name}
                className="w-full h-60 object-cover rounded-md mb-4"
              />
              <CardTitle>{producto.name}</CardTitle>
              <CardDescription>{producto.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <p className="text-2xl font-bold mb-4">${producto.price} MXN / mes</p>
              <Button
                onClick={() =>
                  addItem({
                    id: producto.id,
                    name: producto.name,
                    price: producto.price,
                    image: producto.image,
                    type: producto.type,
                  })
                }
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Suscribirme
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 🐾 Mensaje informativo sobre cancelaciones */}
      <p className="text-center text-muted-foreground mt-16 max-w-2xl mx-auto">
        🐾 Puedes cancelar tu suscripción en cualquier momento desde el enlace incluido 
        en el correo de confirmación que recibirás después de tu compra.
      </p>
    </main>
  );
}
