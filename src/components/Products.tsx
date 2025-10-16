import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, Leaf } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import productFresh from "@/assets/product-fresh.jpg";
import productPremium from "@/assets/product-premium.jpg";

const products = [
  {
    id: "fresh-10kg",
    name: "Mohhikat Fresh",
    weight: "10kg",
    scent: "Aroma Fresco",
    image: productFresh,
    description: "Fórmula de ultra aglomeración con fragancia refrescante para uso diario",
    color: "teal",
    features: ["Máxima Absorción", "Control de Polvo", "Uso Multigato", "Ecológico"],
    price: 149.99,
  },
  {
    id: "premium-7kg",
    name: "Mohhikat Premium",
    weight: "7kg",
    scent: "Aroma Zen",
    image: productPremium,
    description: "Calidad premium con fragancia zen relajante para un hogar en paz",
    color: "secondary",
    features: ["Calidad Premium", "Mejor Absorción", "Espacios Limpios", "Larga Duración"],
    badge: "Premium",
    price: 159.99,
  },
];

export const Products = () => {
  const { addItem } = useCart();

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      type: 'product',
    });
  };

  return (
    <section id="products" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Nuestros Productos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Elige la arena perfecta para tu gato. Ambas fórmulas ofrecen calidad y rendimiento excepcional.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <Card 
              key={product.id} 
              className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2"
            >
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-80 object-cover"
                />
                {product.badge && (
                  <Badge className="absolute top-4 right-4 bg-secondary text-secondary-foreground">
                    <Star className="w-3 h-3 mr-1" />
                    {product.badge}
                  </Badge>
                )}
              </div>
              
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-2xl font-bold">{product.name}</h3>
                    <Leaf className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex gap-2 mb-3">
                    <Badge variant="outline" className="text-sm">
                      {product.weight}
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                      {product.scent}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {product.features.map((feature) => (
                    <div key={feature} className="flex items-center text-sm">
                      <div className={`w-2 h-2 rounded-full bg-${product.color} mr-2`} />
                      {feature}
                    </div>
                  ))}
                </div>
                
                <div className="mb-4">
                  <span className="text-3xl font-bold text-primary">
                    ${product.price}
                  </span>
                  <span className="text-muted-foreground"> MXN</span>
                </div>
                
                <Button 
                  className="w-full" 
                  variant={product.id === "premium-7kg" ? "secondary" : "default"}
                  size="lg"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Agregar al Carrito
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
